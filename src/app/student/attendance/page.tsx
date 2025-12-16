'use client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Clock } from 'lucide-react';

export default function AttendancePage() {
    const attendanceData = [
        { course: 'Machine Learning', code: 'CS401', status: 'Present', date: 'Today, 10:00 AM' },
        { course: 'Advanced Calculus', code: 'MAT302', status: 'Present', date: 'Yesterday, 2:00 PM' },
        { course: 'Computer Vision', code: 'CS404', status: 'Absent', date: 'Mon, 12 Oct' },
        { course: 'Ethics in AI', code: 'HUM201', status: 'Present', date: 'Fri, 9 Oct' },
        { course: 'Cloud Computing', code: 'CS405', status: 'Present', date: 'Thu, 8 Oct' },
    ];

    return (
        <AppShell role="student">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Attendance Record</h1>
                    <p className="text-slate-500">Track your presence across all enrolled courses.</p>
                </div>

                <div className="grid gap-4">
                    {attendanceData.map((item, i) => (
                        <Card key={i}>
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${item.status === 'Present' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {item.status === 'Present' ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{item.course}</h3>
                                        <p className="text-sm text-muted-foreground">{item.code} • {item.date}</p>
                                    </div>
                                </div>
                                <Badge variant={item.status === 'Present' ? 'default' : 'destructive'}>
                                    {item.status}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
