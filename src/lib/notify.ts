/**
 * Lead notification utility
 *
 * Centralizes lead tracking: HubSpot CRM contact creation and email notification.
 *
 * Required environment variables:
 *   HUBSPOT_API_KEY  - HubSpot private app access token
 *   RESEND_API_KEY   - Resend API key (for email notifications)
 *
 * Both integrations fail silently so the public API always returns a response.
 */

export interface LeadData {
  email: string;
  name?: string;
  company?: string;
  role?: string;
  source: string;
  details?: Record<string, unknown>;
}

export async function notifyLead(data: LeadData): Promise<void> {
  // 1. Log
  console.log(`[LEAD] ${data.source}:`, {
    email: data.email,
    name: data.name,
    company: data.company,
    role: data.role,
    details: data.details,
    timestamp: new Date().toISOString(),
  });

  // 2. HubSpot CRM — create or update contact
  if (process.env.HUBSPOT_API_KEY) {
    try {
      await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
        },
        body: JSON.stringify({
          properties: {
            email: data.email,
            firstname: data.name?.split(' ')[0] || '',
            lastname: data.name?.split(' ').slice(1).join(' ') || '',
            company: data.company || '',
            jobtitle: data.role || '',
            lead_source: `Website - ${data.source}`,
            hs_lead_status: 'NEW',
          },
        }),
      });
    } catch (err) {
      console.error('[HubSpot Error]', err instanceof Error ? err.message : err);
    }
  }

  // 3. Email notification to contact@dynamo.tech
  //    Requires RESEND_API_KEY (https://resend.com) or a similar email service.
  //    When configured, uncomment and adapt:
  //
  //    if (process.env.RESEND_API_KEY) {
  //      await fetch('https://api.resend.com/emails', {
  //        method: 'POST',
  //        headers: {
  //          'Content-Type': 'application/json',
  //          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //        },
  //        body: JSON.stringify({
  //          from: 'DYNAMO Website <noreply@dynamo.tech>',
  //          to: 'contact@dynamo.tech',
  //          subject: `New Lead: ${data.source} — ${data.email}`,
  //          html: `
  //            <h2>New lead from ${data.source}</h2>
  //            <p><strong>Name:</strong> ${data.name || '—'}</p>
  //            <p><strong>Email:</strong> ${data.email}</p>
  //            <p><strong>Company:</strong> ${data.company || '—'}</p>
  //            <p><strong>Role:</strong> ${data.role || '—'}</p>
  //            <p><strong>Details:</strong></p>
  //            <pre>${JSON.stringify(data.details, null, 2)}</pre>
  //          `,
  //        }),
  //      }).catch((err) =>
  //        console.error('[Email Error]', err instanceof Error ? err.message : err),
  //      );
  //    }
}
