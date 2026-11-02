"use client";

/* reopens the Cookiebot banner so a visitor can change or withdraw their choice (promised on /privacy) */
export default function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => (window as Window & { Cookiebot?: { renew?: () => void } }).Cookiebot?.renew?.()}
    >
      Cookie-instellingen
    </button>
  );
}
