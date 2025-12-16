'use client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, BookOpen, ArrowRight, ClipboardCheck, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function StudentDashboard() {
    return (
        <AppShell role="student">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Hello, Student</h1>
                    <p className="text-slate-500">Here's your academic overview for today.</p>
                </div>
                <Button>
                    <Calendar className="mr-2 w-4 h-4" /> Sync Calendar
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
                        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">Class Cancelled</div>
                        <p className="text-xs text-muted-foreground">CS101 • Today</p>
                        <Button variant="link" className="px-0 mt-2 text-blue-600 h-auto">View 2 New Alerts <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Deadline</CardTitle>
                        <Clock className="w-4 h-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Machine Learning</div>
                        <p className="text-xs text-muted-foreground">Assignment 3 • Due Tomorrow</p>
                        <Button variant="link" className="px-0 mt-2 text-blue-600 h-auto">Start Working <ArrowRight className="w-4 h-4 ml-1" /></Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Attendance</CardTitle>
                        <ClipboardCheck className="w-4 h-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">92%</div>
                        <p className="text-xs text-muted-foreground">Present for 45/49 sessions</p>
                        <Link href="/student/attendance">
                            <Button variant="link" className="px-0 mt-2 text-blue-600 h-auto">View Details <ArrowRight className="w-4 h-4 ml-1" /></Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Results</CardTitle>
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3.8 GPA</div>
                        <p className="text-xs text-muted-foreground">Last Sem: 4.0</p>
                        <Link href="/student/grades">
                            <Button variant="link" className="px-0 mt-2 text-blue-600 h-auto">View Transcript <ArrowRight className="w-4 h-4 ml-1" /></Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Completed "Intro to AI" Quiz</p>
                                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">Drafted Research Paper Abstract</p>
                                    <p className="text-xs text-muted-foreground">Yesterday</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-0">
                    <CardHeader>
                        <CardTitle className="text-white">AI Tutor Quick Access</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-indigo-100">Need help with a complex topic? Ask your AI tutor now.</p>
                        <Button variant="secondary" className="w-full">
                            Open Chat
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
