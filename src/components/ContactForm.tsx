"use client";

import { useActionState, useEffect } from "react";
import { sendContact } from "@/app/contact/actions";
import { topics, type ContactField, type ContactState } from "@/app/contact/fields";
import { FrameGlyph } from "./Logo";
import { TextLink } from "./ui";

const MAIL = "hallo@nxtframe.ai";
const initial: ContactState = { status: "idle" };

const input =
  "mt-2 w-full rounded-2xl border border-forest/15 bg-cream/60 px-4 py-3.5 text-base text-forest outline-none transition-colors placeholder:text-forest/40 focus:border-forest focus:bg-paper aria-[invalid=true]:border-[#b3261e] aria-[invalid=true]:bg-[#fdf3f2]";

function Field({
  name,
  label,
  optional = false,
  state,
  children,
}: {
  name: ContactField;
  label: string;
  optional?: boolean;
  state: ContactState;
  children: (props: { id: string; name: string; defaultValue: string; "aria-invalid": boolean; "aria-describedby"?: string; className: string }) => React.ReactNode;
}) {
  const error = state.errors?.[name];
  return (
    <div>
      <label htmlFor={`cf-${name}`} className="flex items-baseline justify-between gap-3 text-sm font-semibold text-forest">
        {label}
        {optional && <span className="text-[13px] font-normal text-forest/50">mag leeg blijven</span>}
      </label>
      {children({
        id: `cf-${name}`,
        name,
        defaultValue: state.values?.[name] ?? "",
        "aria-invalid": Boolean(error),
        "aria-describedby": error ? `cf-${name}-error` : undefined,
        className: input,
      })}
      {error && (
        <p id={`cf-${name}-error`} className="mt-2 text-sm font-medium text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * The contact form: who you are, what it is about and your message, sent through the sendContact
 * server action. The form works without JavaScript too. After sending, the card shows what happens
 * next; if the mail could not go out, the visitor gets a ready-made mail with their own text in it.
 */
export default function ContactForm() {
  const [state, action, pending] = useActionState(sendContact, initial);

  // after a rejected send, take the visitor to the first field that needs them (on a phone it is
  // usually above the screen, out of sight)
  useEffect(() => {
    if (state.status !== "invalid") return;
    const first = document.querySelector<HTMLElement>('form [aria-invalid="true"]');
    first?.focus({ preventScroll: true });
    first?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [state]);

  if (state.status === "sent") {
    return (
      <div className="rounded-[14px] bg-forest p-8 text-cream md:p-12" role="status">
        <span className="grid size-12 place-items-center rounded-full bg-lime text-forest">
          <FrameGlyph className="size-5" />
        </span>
        <h2 className="mt-8 t-sub">
          Je aanvraag is <span className="serif-italic text-lime">binnen</span>
        </h2>
        <p className="mt-5 max-w-md text-cream/80 t-lead">
          Ik lees hem zelf en reageer meestal binnen één werkdag{state.values?.email ? ` op ${state.values.email}` : ""}, met een voorstel voor een moment om te bellen.
        </p>
        <TextLink light href="/werk" className="mt-8">Bekijk intussen het werk</TextLink>
      </div>
    );
  }

  const v = state.values ?? {};
  // the fallback when the mail could not be sent: the visitor's own text, ready in their mail program
  const mailto = `mailto:${MAIL}?subject=${encodeURIComponent(`Aanvraag${v.onderwerp ? `: ${v.onderwerp}` : ""}`)}&body=${encodeURIComponent(
    [v.bericht, "", v.naam, v.telefoon, v.website].filter(Boolean).join("\n"),
  )}`;

  return (
    <form action={action} noValidate className="rounded-[14px] bg-paper p-6 ring-1 ring-forest/10 md:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field name="naam" label="Naam" state={state}>
          {(p) => <input {...p} type="text" autoComplete="name" required />}
        </Field>
        <Field name="email" label="E-mailadres" state={state}>
          {(p) => <input {...p} type="email" autoComplete="email" inputMode="email" required />}
        </Field>
        <Field name="telefoon" label="Telefoon" optional state={state}>
          {(p) => <input {...p} type="tel" autoComplete="tel" inputMode="tel" />}
        </Field>
        <Field name="website" label="Huidige website" optional state={state}>
          {(p) => <input {...p} type="text" inputMode="url" placeholder="jouwbedrijf.nl" />}
        </Field>
      </div>

      {/* what it is about: one of five, as pills */}
      <fieldset className="mt-8">
        <legend className="text-sm font-semibold text-forest">Waar gaat het om?</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" name="onderwerp" value={t} defaultChecked={v.onderwerp === t} className="peer sr-only" />
              <span className="inline-flex rounded-full border border-forest/15 px-4 py-2 text-sm font-medium text-forest transition-colors hover:border-forest peer-checked:border-forest peer-checked:bg-forest peer-checked:text-lime peer-focus-visible:ring-2 peer-focus-visible:ring-forest peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-paper">
                {t}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <Field name="bericht" label="Je bericht" state={state}>
          {(p) => <textarea {...p} rows={6} required placeholder="Wat doet je bedrijf, en wat moet de site opleveren?" />}
        </Field>
      </div>

      {/* the honeypot: off screen and out of the tab order, only a bot fills it in */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label>
          Fax
          <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <button
          type="submit"
          disabled={pending}
          className="btn-slide inline-flex items-center justify-center whitespace-nowrap rounded-full bg-forest px-8 py-4 text-base font-semibold text-paper transition-colors hover:bg-forest-hover disabled:opacity-60"
        >
          <span className="btn-slide-text">
            <span>{pending ? "Bezig met versturen" : "Verstuur mijn aanvraag"}</span>
            <span aria-hidden="true">{pending ? "Bezig met versturen" : "Verstuur mijn aanvraag"}</span>
          </span>
        </button>
        <p className="text-[13px] text-forest/60">Gratis · 30 minuten · vrijblijvend</p>
      </div>

      <div aria-live="polite">
        {state.status === "invalid" && <p className="mt-5 text-sm font-medium text-[#b3261e]">Er ontbreekt nog iets. Kijk de velden hierboven na.</p>}
        {state.status === "failed" && (
          <div className="mt-6 rounded-2xl bg-lime p-5 text-forest">
            <p className="font-semibold">Versturen lukt op dit moment niet.</p>
            <p className="mt-1 text-[15px] text-forest/80">Je tekst is niet weg. Met één klik zet je hem in een mail aan mij.</p>
            <TextLink href={mailto} className="mt-4">Open als mail naar {MAIL}</TextLink>
          </div>
        )}
      </div>

      <p className="mt-6 border-t border-forest/15 pt-5 text-[13px] leading-relaxed text-forest/60">
        Ik gebruik je gegevens alleen om op je aanvraag te reageren. Meer daarover in de{" "}
        <a href="/privacy" className="border-b border-forest/30 font-medium text-forest hover:border-forest">privacyverklaring</a>.
      </p>
    </form>
  );
}
