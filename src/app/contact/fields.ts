/* The contact form's fields and state, shared by the form (client) and its action (server). */
export const topics = ["Nieuwe website", "Redesign", "Webshop", "Landingspagina", "Iets anders"] as const;

export type ContactField = "naam" | "email" | "telefoon" | "website" | "onderwerp" | "bericht";
export type ContactState = {
  status: "idle" | "sent" | "invalid" | "failed";
  errors?: Partial<Record<ContactField, string>>;
  /** what the visitor typed, handed back so the form keeps it after an error */
  values?: Partial<Record<ContactField, string>>;
};
