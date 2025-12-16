import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ------------------------------------------------------------------
// EDIT THIS LIST WITH YOUR REAL CLASSMATES
// ------------------------------------------------------------------
const classmates = [
    { name: "Rahul", email: "rahul@college.edu" },
    { name: "Priya", email: "priya@college.edu" },
    { name: "Amit", email: "amit@college.edu" },
    { name: "Sneha", email: "sneha@college.edu" },
    { name: "Vikram", email: "vikram@college.edu" },
    // Add more here...
]

async function main() {
    console.log('🌱 Starting to seed database with classmates...')

    for (const person of classmates) {
        const user = await prisma.user.upsert({
            where: { email: person.email },
            update: {}, // If they exist, do nothing
            create: {
                email: person.email,
                name: person.name,
                role: 'student',
                // Creating some default attendance for them
                attendance: {
                    create: [
                        { status: 'Present', courseId: 'CS101' },
                        { status: 'Present', courseId: 'CS102' },
                        { status: 'Absent', courseId: 'CS103' },
                    ]
                },
                // Creating some default grades
                grades: {
                    create: [
                        { type: 'assignment1', score: 85, courseId: 'CS101' },
                        { type: 'midterm', score: 78, courseId: 'CS101' }
                    ]
                }
            },
        })
        console.log(`Created student: ${user.name}`)
    }

    console.log('✅ Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
