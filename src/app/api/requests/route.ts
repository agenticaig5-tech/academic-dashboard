import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, recipient, details, role } = body;

    // Use a placeholder ID for now (since we don't have Auth session ID)
    // In strict mode, we'd look up the user by email or session.
    // For demo: create a dummy user if not exists or find first user
    let user = await db.user.findFirst({ where: { role } });

    if (!user) {
      // Fallback: Create a temporary user to link the request to
      user = await db.user.create({
        data: {
          email: `${role}_demo@college.edu`,
          role: role,
          name: 'Demo User'
        }
      });
    }

    await db.serviceRequest.create({
      data: {
        requesterId: user.id,
        type,
        recipient,
        details,
        status: 'pending'
      }
    });

    return NextResponse.json({ success: true, message: 'Request submitted successfully to DB' });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: 'Failed to process request' }, { status: 500 });
  }
}
