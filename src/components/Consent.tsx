import Script from "next/script";
import ClarityOnConsent from "@/components/ClarityOnConsent";

/* The cookie banner (Cookiebot) and the tools that need consent. Every id is a public value set in
   Vercel (Settings > Environment Variables) and read at build time; leave one empty and that piece
   doesn't load at all.
     PUBLIC_COOKIEBOT_ID  Cookiebot "domain group id" (admin.cookiebot.com, the data-cbid value)
     PUBLIC_CLARITY_ID    Microsoft Clarity project id (loads only after "statistieken" consent)
     PUBLIC_GTM_ID        Google Tag Manager container (GA4 is set up inside it)
   Order matters: Google's Consent Mode starts at "denied" before anything runs, Cookiebot lifts it
   after the visitor chooses, and only then may GTM's tags write cookies. The site's own cookieless
   Tracker and Speed Insights don't need consent and stay outside this. */

export const cookiebotId = process.env.PUBLIC_COOKIEBOT_ID;
const clarityId = process.env.PUBLIC_CLARITY_ID;
const gtmId = process.env.PUBLIC_GTM_ID;

export const consentDefault = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'denied',personalization_storage:'denied',security_storage:'granted',wait_for_update:500});
gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);`;

const gtmLoader = (id: string) => `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(id)});`;

/* The consent default and Cookiebot itself load beforeInteractive, which Next only allows in the
   root layout: they sit there (layout.tsx), this renders what follows them */
export default function Consent() {
  // without a banner nothing that needs consent may load
  if (!cookiebotId) return null;
  return (
    <>
      {gtmId && <Script id="gtm" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: gtmLoader(gtmId) }} />}
      {clarityId && <ClarityOnConsent id={clarityId} />}
    </>
  );
}
