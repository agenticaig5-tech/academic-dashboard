export interface Student {
    id: string;
    name: string;
    email: string;
    attendance: number; // Percentage
    grades: {
        midterm: number;
        final?: number;
        assignment1: number;
    }
}

// Initial Data
export let students: Student[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com', attendance: 90, grades: { midterm: 85, assignment1: 92 } },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com', attendance: 85, grades: { midterm: 78, assignment1: 88 } },
    { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', attendance: 95, grades: { midterm: 92, assignment1: 95 } },
    { id: '4', name: 'David Lee', email: 'david@example.com', attendance: 80, grades: { midterm: 70, assignment1: 75 } },
    { id: '5', name: 'Eva Garcia', email: 'eva@example.com', attendance: 88, grades: { midterm: 82, assignment1: 90 } },
    { id: '6', name: 'Frank Wilson', email: 'frank@example.com', attendance: 92, grades: { midterm: 88, assignment1: 85 } },
    { id: '7', name: 'Grace Miller', email: 'grace@example.com', attendance: 96, grades: { midterm: 95, assignment1: 98 } },
    { id: '8', name: 'Henry Davis', email: 'henry@example.com', attendance: 75, grades: { midterm: 65, assignment1: 70 } },
    { id: '9', name: 'Ivy Martinez', email: 'ivy@example.com', attendance: 89, grades: { midterm: 84, assignment1: 86 } },
    { id: '10', name: 'Jack Taylor', email: 'jack@example.com', attendance: 91, grades: { midterm: 86, assignment1: 89 } },
    { id: '11', name: 'Kevin White', email: 'kevin@example.com', attendance: 82, grades: { midterm: 72, assignment1: 78 } },
    { id: '12', name: 'Laura Harris', email: 'laura@example.com', attendance: 98, grades: { midterm: 98, assignment1: 100 } },
];

export const dbService = {
    getStudents: () => students,

    markAttendance: (count: number) => {
        // Marks the first 'count' students as present (Simulated up-tick)
        const updatedNames: string[] = [];
        for (let i = 0; i < count && i < students.length; i++) {
            students[i].attendance = Math.min(100, students[i].attendance + 1);
            updatedNames.push(students[i].name);
        }
        return updatedNames;
    },

    getAverageGrade: (assignmentType: 'midterm' | 'assignment1') => {
        let sum = 0;
        students.forEach(s => sum += s.grades[assignmentType]);
        return (sum / students.length).toFixed(1);
    }
};
