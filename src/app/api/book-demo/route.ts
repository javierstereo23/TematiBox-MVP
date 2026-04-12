import { NextResponse } from 'next/server';
import { notifyLead } from '@/lib/notify';

const GOOGLE_CALENDAR_API = 'https://www.googleapis.com/calendar/v3';
const SALES_EMAIL = 'segundo.salvadores@dynamo.tech';
const ORGANIZER_EMAIL = 'javier@dynamo.tech';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { date, time, name, email, company } = body;

    if (!date || !time) {
      return NextResponse.json({ error: 'Date and time are required' }, { status: 400 });
    }

    // Parse the date and time into ISO format (Buenos Aires timezone)
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);

    const startDateTime = `${date}T${time}:00`;
    const endHours = minutes + 15 >= 60 ? hours + 1 : hours;
    const endMinutes = (minutes + 15) % 60;
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    const endDateTime = `${date}T${endTime}:00`;

    const attendeeName = name || 'Prospecto';
    const attendeeCompany = company || '';
    const summary = `Demo DYNAMO Journeys — ${attendeeName}${attendeeCompany ? ` (${attendeeCompany})` : ''}`;
    const description = `Demo de 15 minutos de DYNAMO Journeys.

Solicitante: ${attendeeName}
${email ? `Email: ${email}` : ''}
${attendeeCompany ? `Empresa: ${attendeeCompany}` : ''}

Agendada desde dynamo.tech`;

    // Try to create Google Calendar event if API key is available
    const calendarApiKey = process.env.GOOGLE_CALENDAR_API_KEY;
    const calendarAccessToken = process.env.GOOGLE_CALENDAR_ACCESS_TOKEN;

    let calendarCreated = false;

    if (calendarAccessToken) {
      try {
        const event = {
          summary,
          description,
          start: {
            dateTime: startDateTime,
            timeZone: 'America/Argentina/Buenos_Aires',
          },
          end: {
            dateTime: endDateTime,
            timeZone: 'America/Argentina/Buenos_Aires',
          },
          attendees: [
            { email: SALES_EMAIL, displayName: 'Segundo Salvadores' },
            ...(email ? [{ email, displayName: attendeeName }] : []),
          ],
          reminders: {
            useDefault: false,
            overrides: [
              { method: 'popup', minutes: 10 },
              { method: 'email', minutes: 30 },
            ],
          },
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: { type: 'hangoutsMeet' },
              requestId: `dynamo-demo-${Date.now()}`,
            },
          },
        };

        const res = await fetch(
          `${GOOGLE_CALENDAR_API}/calendars/primary/events?conferenceDataVersion=1&sendUpdates=all`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${calendarAccessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
          }
        );

        if (res.ok) {
          calendarCreated = true;
          console.log('[BOOK-DEMO] Calendar event created successfully');
        } else {
          const err = await res.text();
          console.error('[BOOK-DEMO] Calendar API error:', err);
        }
      } catch (calError) {
        console.error('[BOOK-DEMO] Calendar creation failed:', calError);
      }
    }

    // Always notify via HubSpot + email as backup
    await notifyLead({
      email: email || 'no-email@dynamo.tech',
      name: attendeeName,
      company: attendeeCompany,
      source: 'Demo Booking',
      details: {
        date,
        time,
        calendarCreated: String(calendarCreated),
      },
    });

    return NextResponse.json({
      success: true,
      calendarCreated,
      message: calendarCreated
        ? 'Demo agendada. Recibirás una invitación de Google Calendar.'
        : 'Solicitud recibida. Te confirmaremos el horario por email.',
    });
  } catch (error) {
    console.error('[BOOK-DEMO] Error:', error);
    return NextResponse.json(
      { error: 'Error al agendar la demo' },
      { status: 500 }
    );
  }
}
