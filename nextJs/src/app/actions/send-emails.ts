'use server'

import nodemailer from 'nodemailer'
import { z } from 'zod'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('A valid email is required').max(200),
  message: z.string().min(10, 'Please provide at least 10 characters').max(5000),
  plan: z.string().max(100).optional(),
  hp: z.string().optional(), // honeypot, should stay empty
})

export type ContactState = {
  ok: boolean
  message: string
  errors?: Record<string, string>
}

export async function sendContactEmail(
  _prev: ContactState | undefined,
  formData: FormData,
): Promise<ContactState> {
  try {
    // Honeypot check
    const hp = (formData.get('hp') as string) || ''
    if (hp.trim() !== '') {
      // Silently succeed to mislead bots
      return { ok: true, message: 'Thank you! We will be in touch shortly.' }
    }

    const parsed = schema.safeParse({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      message: formData.get('message'),
      plan: formData.get('plan'),
      hp,
    })

    if (!parsed.success) {
      const errors: Record<string, string> = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]?.toString() || 'form'
        if (!errors[field]) errors[field] = issue.message
      }
      return {
        ok: false,
        message: 'Please fix the highlighted errors.',
        errors,
      }
    }

    const { firstName, lastName, email, message, plan } = parsed.data

    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD
    const to = process.env.CONTACT_TO || user

    if (!user || !pass || !to) {
      return {
        ok: false,
        message:
          'Email is not configured. Please set GMAIL_USER, GMAIL_APP_PASSWORD, and optionally CONTACT_TO in your project environment variables.',
      }
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    })

    const subject = `New SoftHub inquiry${plan ? ` [${plan}]` : ''} from ${firstName} ${lastName}`
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 12px;">New Contact Request</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${
          plan
            ? `<p><strong>Selected Plan:</strong> ${plan}</p>`
            : ''
        }
        <p style="margin-top:16px;"><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;background:#f8fafc;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">${message}</pre>
        <p style="font-size:12px;color:#64748b;margin-top:16px;">Sent from SoftHub website</p>
      </div>
    `

    await transporter.sendMail({
      from: `"SoftHub Website" <${user}>`,
      to,
      subject,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\n${plan ? `Plan: ${plan}\n` : ''}\nMessage:\n${message}`,
      html,
      replyTo: email,
    })

    return { ok: true, message: 'Thanks! Your message has been sent. We’ll get back to you shortly.' }
  } catch (err) {
    console.error('sendContactEmail error:', err)
    return { ok: false, message: 'Something went wrong. Please try again later.' }
  }
}
