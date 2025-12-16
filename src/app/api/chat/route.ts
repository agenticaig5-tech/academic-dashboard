import { StreamingTextResponse } from 'ai';
import db from '@/lib/db';

// Next.js Edge Runtime doesn't fully support Prisma yet in all envs without specific setup,
// often usually NodeJS runtime is safer for DB ops in API routes.
export const runtime = 'nodejs';

export async function POST(req: Request) {
    const { messages, role } = await req.json();
    const lastMessage = messages[messages.length - 1].content.toLowerCase();

    let responseText = "";

    // ---------------------------------------------------------
    // FACULTY INTELLIGENT AGENT LOGIC
    // ---------------------------------------------------------
    if (role === 'faculty') {

        // TOOL 1: Mark Attendance
        if (lastMessage.includes("attendance") && (lastMessage.includes("mark") || lastMessage.includes("add"))) {
            // Extract number "first 10 students"
            const numberMatch = lastMessage.match(/(\d+)/);
            const count = numberMatch ? parseInt(numberMatch[0]) : 5;

            // Get first N students
            const students = await db.user.findMany({
                where: { role: 'student' },
                take: count
            });

            if (students.length === 0) {
                responseText = "I couldn't find any students in the database to mark attendance for.";
            } else {
                // Create attendance records
                await db.attendance.createMany({
                    data: students.map((s: any) => ({
                        studentId: s.id,
                        status: 'Present',
                        courseId: 'CS101' // Default course
                    }))
                });

                const names = students.map((s: any) => s.name || s.email);
                responseText = `✅ **Action Completed**: I have successfully marked "Present" for ${students.length} students in the database.\n\n` +
                    `Records updated for: ${names.slice(0, 3).join(", ")}${names.length > 3 ? "..." : ""}.`;
            }
        }

        // TOOL 2: Calculate Average
        else if (lastMessage.includes("average") || lastMessage.includes("mean")) {
            const type = lastMessage.includes("assignment") ? "assignment" : "midterm";

            const aggregates = await db.grade.aggregate({
                where: { type: { contains: type } },
                _avg: { score: true },
                _count: true
            });

            const avg = aggregates._avg.score?.toFixed(1) || "0.0";
            const count = aggregates._count;

            responseText = `📊 **Data Analysis**: The computed class average for **${type}** is **${avg}%**.\n` +
                `This is calculated based on ${count} grades found in the database.`;
        }

        // FALLBACK
        else {
            responseText = "As your faculty assistant, I can **mark attendance** or **calculate grade averages** using the live database. Try asking me: 'Mark attendance for the first 5 students'.";
        }

    }

    // ---------------------------------------------------------
    // STUDENT INTELLIGENT AGENT LOGIC
    // ---------------------------------------------------------
    else {
        responseText = "I am your study buddy! Ask me about your due dates or research topics.";
    }


    // Create a stream for the response
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
        async start(controller) {
            // Simulate "Thinking..." delay
            await new Promise(r => setTimeout(r, 600));

            const tokens = responseText.split(' ');
            for (const token of tokens) {
                controller.enqueue(encoder.encode(token + ' '));
                await new Promise(r => setTimeout(r, 30));
            }
            controller.close();
        }
    });

    return new StreamingTextResponse(stream);
}
