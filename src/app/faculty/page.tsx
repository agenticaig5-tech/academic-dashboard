'use client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Users, GraduationCap, ArrowRight } from 'lucide-react';

export default function FacultyDashboard() {
    return (
        <AppShell role="faculty">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Welcome, Professor</h1>
                    <p className="text-slate-500">Manage your courses, grading, and research.</p>
                </div>
                <Button>
                    <FileText className="mr-2 w-4 h-4" /> New Syllabus
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Students</CardTitle>
                        <Users className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">145</div>
                        <p className="text-xs text-muted-foreground">Across 3 courses</p>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
