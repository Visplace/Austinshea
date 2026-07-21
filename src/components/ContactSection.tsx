import { useState, type FormEvent } from 'react'
import { Mail, FileDown } from 'lucide-react'
import { siteConfig } from '../data/site'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { Button } from './Button'

const inquiryTypes = [
  'Professional Opportunity',
  'Commercial Real Estate Consulting',
  'Lease or Contract Analysis',
  'Underwriting and Financial Analysis',
  'Tenant Advisory',
  'Expert-Network Inquiry',
  'General Message',
]

interface FormValues {
  name: string
  email: string
  company: string
  subject: string
  inquiryType: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  company: '',
  subject: '',
  inquiryType: inquiryTypes[0],
  message: '',
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.subject.trim()) errors.subject = 'Please enter a subject.'
  if (!values.message.trim()) errors.message = 'Please enter a message.'
  return errors
}

const fieldClasses =
  'w-full rounded-xl border border-[#0D212C]/15 bg-white px-4 py-3 text-sm text-[#051A24] placeholder:text-[#273C46]/50 focus:border-[#051A24] focus:outline-none'

export function ContactSection() {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>()
  const revealClass = isInView ? 'animate-fade-in-up' : 'opacity-0'

  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})

  const setField = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const bodyLines = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.company ? `Company: ${values.company}` : null,
      `Inquiry type: ${values.inquiryType}`,
      '',
      values.message,
    ].filter((line): line is string => line !== null)

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      values.subject,
    )}&body=${encodeURIComponent(bodyLines.join('\n'))}`
    window.location.href = mailto
  }

  return (
    <section id="contact" aria-label="Contact" className="w-full py-16">
      <div ref={ref} className="mx-auto max-w-3xl px-6">
        <h2
          className={`${revealClass} text-3xl leading-tight tracking-tight text-[#0D212C] md:text-4xl lg:text-5xl`}
        >
          Let&rsquo;s discuss the <span className="font-serif">next opportunity</span>
        </h2>

        <p
          className={`${revealClass} mt-5 max-w-2xl text-sm leading-relaxed text-[#051A24]/80 md:text-base`}
          style={{ animationDelay: '0.1s' }}
        >
          I welcome conversations involving commercial real estate operations, lease
          administration, property-level financial analysis, underwriting, tenant advisory,
          expert-network consulting, and related professional opportunities.
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className={`${revealClass} mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2`}
          style={{ animationDelay: '0.2s' }}
        >
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              className={fieldClasses}
              value={values.name}
              onChange={(e) => setField('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1 text-xs text-red-700">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              className={fieldClasses}
              value={values.email}
              onChange={(e) => setField('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 text-xs text-red-700">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-company" className="mb-1.5 block text-sm font-medium">
              Company <span className="font-normal text-[#273C46]/70">(optional)</span>
            </label>
            <input
              id="contact-company"
              type="text"
              autoComplete="organization"
              className={fieldClasses}
              value={values.company}
              onChange={(e) => setField('company', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="contact-inquiry" className="mb-1.5 block text-sm font-medium">
              Inquiry type
            </label>
            <select
              id="contact-inquiry"
              className={fieldClasses}
              value={values.inquiryType}
              onChange={(e) => setField('inquiryType', e.target.value)}
            >
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-subject" className="mb-1.5 block text-sm font-medium">
              Subject
            </label>
            <input
              id="contact-subject"
              type="text"
              className={fieldClasses}
              value={values.subject}
              onChange={(e) => setField('subject', e.target.value)}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            />
            {errors.subject && (
              <p id="contact-subject-error" className="mt-1 text-xs text-red-700">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium">
              Message
            </label>
            <textarea
              id="contact-message"
              rows={5}
              className={fieldClasses}
              value={values.message}
              onChange={(e) => setField('message', e.target.value)}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-red-700">
                {errors.message}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <Button type="submit" variant="primary">
              Send message
            </Button>
            <p className="mt-3 text-xs text-[#273C46]">
              Submitting opens your email client with the message pre-filled.
            </p>
          </div>
        </form>

        <div
          className={`${revealClass} mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#0D212C]/10 pt-8`}
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#051A24] hover:opacity-70"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Email
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#051A24] hover:opacity-70"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
          <a
            href={siteConfig.resumeHref}
            download
            className="inline-flex items-center gap-2 text-sm font-medium text-[#051A24] hover:opacity-70"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Download Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
