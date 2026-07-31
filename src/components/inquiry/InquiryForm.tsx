"use client";

import { useState } from "react";

type InquiryFormLabels = {
  name: string;
  company: string;
  email: string;
  message: string;
  submit: string;
  sending: string;
  success: string;
  failure: string;
  requiredName: string;
  requiredEmail: string;
  invalidEmail: string;
};

type Fields = { name: string; company: string; email: string; message: string; website: string };
type FieldErrors = Partial<Record<"name" | "email", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY_FIELDS: Fields = { name: "", company: "", email: "", message: "", website: "" };

export function InquiryForm({ labels }: { labels: InquiryFormLabels }) {
  const [fields, setFields] = useState<Fields>(EMPTY_FIELDS);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "failure">("idle");

  function validate() {
    const next: FieldErrors = {};
    if (!fields.name.trim()) next.name = labels.requiredName;
    if (!fields.email.trim()) next.email = labels.requiredEmail;
    else if (!EMAIL.test(fields.email.trim())) next.email = labels.invalidEmail;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
    if (key === "name" || key === "email") setErrors((current) => ({ ...current, [key]: undefined }));
    if (status === "failure") setStatus("idle");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      if (!response.ok) throw new Error("Inquiry request failed");
      setStatus("success");
      setFields(EMPTY_FIELDS);
    } catch {
      setStatus("failure");
    }
  }

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <span className="tick" aria-hidden="true">
          <svg width="15" height="12" viewBox="0 0 15 12" fill="none" focusable="false"><path d="M1.5 6.2 5.4 10 13.5 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p>{labels.success}</p>
      </div>
    );
  }

  return (
    <form className="inquiry-form" onSubmit={submit} noValidate autoComplete="on">
      <div className={`field${errors.name ? " is-bad" : ""}`}>
        <label htmlFor="inquiry-name">{labels.name} <span aria-hidden="true">*</span></label>
        <input id="inquiry-name" name="name" type="text" autoComplete="name" value={fields.name} onChange={(event) => update("name", event.target.value)} aria-invalid={errors.name ? "true" : undefined} aria-describedby="inquiry-name-error" />
        <p className="field__err" id="inquiry-name-error">{errors.name}</p>
      </div>
      <div className="field">
        <label htmlFor="inquiry-company">{labels.company}</label>
        <input id="inquiry-company" name="company" type="text" autoComplete="organization" value={fields.company} onChange={(event) => update("company", event.target.value)} />
      </div>
      <div className={`field${errors.email ? " is-bad" : ""}`}>
        <label htmlFor="inquiry-email">{labels.email} <span aria-hidden="true">*</span></label>
        <input id="inquiry-email" name="email" type="email" autoComplete="email" value={fields.email} onChange={(event) => update("email", event.target.value)} aria-invalid={errors.email ? "true" : undefined} aria-describedby="inquiry-email-error" />
        <p className="field__err" id="inquiry-email-error">{errors.email}</p>
      </div>
      <div className="field inquiry-form__wide">
        <label htmlFor="inquiry-message">{labels.message}</label>
        <textarea id="inquiry-message" name="message" rows={5} value={fields.message} onChange={(event) => update("message", event.target.value)} />
      </div>
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(event) => update("website", event.target.value)} />
      </div>
      {status === "failure" && <p className="form-status form-status--error inquiry-form__wide" role="alert">{labels.failure}</p>}
      <div className="inquiry-form__foot inquiry-form__wide">
        <button className="btn btn--solid-ink" type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? labels.sending : labels.submit}
          <svg className="arw" width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true"><path d="M9.6 1 13.5 5 9.6 9M13 5H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </form>
  );
}
