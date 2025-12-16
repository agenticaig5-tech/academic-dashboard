import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with env key (or mock if missing)
const resend = new Resend(process.env.RESEND_API_KEY || 're_123');

export async function POST(req: Request) {
    try {
        const { audience, subject, message, priority } = await req.json();

        console.log("-----------------------------------------");
        console.log(`[BROADCAST INITIATED]`);
        console.log(`Target: ${audience}`);
        console.log(`Priority: ${priority}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log("-----------------------------------------");

        // In a real app with a DB, we would:
        // 1. Fetch all student emails for 'audience'
        // 2. Loop through them or use Resend's batch sending

        if (!process.env.RESEND_API_KEY) {
            // MOCK SUCCESS
            await new Promise(r => setTimeout(r, 1000));
            console.log(`[MOCK] Email successfully 'sent' to simulated recipients.`);
            return NextResponse.json({ success: true, count: 145 });
        }

        // REAL SENDING (Example fallback)
        /*
        await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ['delivered@resend.dev'],
          subject: subject,
          html: `<p>${message}</p>`
        });
        */

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
