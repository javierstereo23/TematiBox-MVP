"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

interface Props {
  compact?: boolean;
}

export function AuthButton({ compact = false }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  async function loginWithGoogle() {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback` },
    });
  }

  async function logout() {
    await supabase.auth.signOut();
    setMenuOpen(false);
  }

  if (loading) {
    return <div className="w-8 h-8 rounded-full bg-border-light animate-pulse" />;
  }

  if (!user) {
    return (
      <button
        onClick={loginWithGoogle}
        className={`inline-flex items-center gap-2 rounded-full font-semibold transition-colors ${
          compact ? "px-3 py-2 text-xs" : "px-4 py-2 text-sm"
        } bg-bg border border-border-light hover:border-primary hover:text-primary text-text-primary`}
      >
        <svg className="w-4 h-4" viewBox="0 0 48 48">
          <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 110-24c3 0 5.8 1.1 7.9 3L37.6 9a20 20 0 1013.4 11.1z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8A12 12 0 0124 16c3 0 5.8 1.1 7.9 3L37.6 9a20 20 0 00-31.3 5.7z" />
          <path fill="#4CAF50" d="M24 44c5.1 0 9.7-2 13.2-5.2l-6.1-5.2a11.9 11.9 0 01-7.1 2.4 12 12 0 01-11.3-8l-6.5 5A20 20 0 0024 44z" />
          <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3a12 12 0 01-4.1 5.6l6.1 5.2c-.4.4 6.7-4.9 6.7-14.8 0-1.3-.1-2.7-.4-3.9z" />
        </svg>
        <span>Ingresar</span>
      </button>
    );
  }

  const name = (user.user_metadata?.full_name as string) || user.email || "Mi cuenta";
  const avatar = user.user_metadata?.avatar_url as string | undefined;
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full hover:bg-primary-bg p-1 transition-colors"
        aria-label="Abrir menú de cuenta"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="w-8 h-8 rounded-full object-cover" />
        ) : (
          <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent-pink text-white font-bold text-sm flex items-center justify-center">
            {initial}
          </span>
        )}
      </button>

      {menuOpen && (
        <>
          <div onClick={() => setMenuOpen(false)} className="fixed inset-0 z-40" />
          <div className="absolute right-0 top-full mt-2 w-56 bg-bg-white rounded-2xl shadow-2xl border border-border-light overflow-hidden z-50">
            <div className="px-4 py-3 border-b border-border-light">
              <p className="text-sm font-bold text-text-primary truncate">{name}</p>
              <p className="text-xs text-text-secondary truncate">{user.email}</p>
            </div>
            <Link
              href="/cuenta"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-text-primary hover:bg-bg transition-colors"
            >
              Mi cuenta
            </Link>
            <Link
              href="/cuenta/pedidos"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-text-primary hover:bg-bg transition-colors"
            >
              Mis pedidos
            </Link>
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-border-light"
            >
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  );
}
