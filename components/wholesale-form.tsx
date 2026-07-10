'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputCls =
  'w-full px-3 py-2.5 bg-bg border border-border rounded text-sm text-ink placeholder:text-ink-muted ' +
  'focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-150';

const labelCls = 'block text-xs font-medium text-ink-mid mb-1.5';

export function WholesaleForm() {
  const t = useTranslations('wholesale_form');
  const [status, setStatus] = useState<Status>('idle');
  const [fields, setFields] = useState({
    name: '',
    company: '',
    email: '',
    message: '',
  });

  const set =
    (k: keyof typeof fields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/wholesale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error('non-ok');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded border border-border bg-surface p-8 flex flex-col items-center text-center gap-4">
        <div className="w-10 h-10 rounded-full bg-accent-muted flex items-center justify-center shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10l4 4 8-8"
              stroke="#F5A623"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm text-ink">{t('success')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded border border-border bg-surface p-6 sm:p-8 flex flex-col gap-4"
      noValidate
    >
      <h3 className="font-display font-medium text-ink text-lg">{t('form_headline')}</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="wf-name" className={labelCls}>
            {t('name_label')} <span aria-hidden="true">*</span>
          </label>
          <input
            id="wf-name"
            type="text"
            required
            autoComplete="name"
            value={fields.name}
            onChange={set('name')}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="wf-company" className={labelCls}>
            {t('company_label')}
          </label>
          <input
            id="wf-company"
            type="text"
            autoComplete="organization"
            value={fields.company}
            onChange={set('company')}
            className={inputCls}
          />
        </div>
      </div>

      <div>
        <label htmlFor="wf-email" className={labelCls}>
          {t('email_label')} <span aria-hidden="true">*</span>
        </label>
        <input
          id="wf-email"
          type="email"
          required
          autoComplete="email"
          value={fields.email}
          onChange={set('email')}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="wf-message" className={labelCls}>
          {t('message_label')}
        </label>
        <textarea
          id="wf-message"
          rows={4}
          value={fields.message}
          onChange={set('message')}
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-amber-700" role="alert">
          {t('error')}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-1 px-5 py-3 bg-accent text-nav-bg text-sm font-medium rounded hover:bg-accent-deep disabled:opacity-50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        {status === 'submitting' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
