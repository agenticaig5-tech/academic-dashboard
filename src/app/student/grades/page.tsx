'use client';

import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Trophy, TrendingUp } from 'lucide-react';

export default function GradesPage() {
    const gradesData = [
        { course: 'Machine Learning', code: 'CS401', grade: 'A', score: 92 },
        { course: 'Advanced Calculus', code: 'MAT302', grade: 'B+', score: 88 },
        { course: 'Computer Vision', code: 'CS404', grade: 'A-', score: 90 },
        { course: 'Ethics in AI', code: 'HUM201', grade: 'A', score: 95 },
        { course: 'Cloud Computing', code: 'CS405', grade: 'B', score: 85 },
    ];

    return (
        <AppShell role="student">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Academic Results</h1>
                    <p className="text-slate-500">Your current standing and semester performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* GPA Summary */}
                    <Card className="bg-slate-900 text-white border-0">
                        <CardHeader>
                            <CardTitle className="text-slate-200">Cumulative GPA</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <Trophy className="w-12 h-12 text-yellow-400" />
                            <div>
                                <div className="text-4xl font-bold">3.85</div>
                                <p className="text-slate-400 text-sm">Top 10% of class</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Credits Earned</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-4">
                            <TrendingUp className="w-12 h-12 text-blue-500" />
                            <div>
                                <div className="text-4xl font-bold">18/24</div>
                                <p className="text-slate-500 text-sm">Credits completed this year</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <h2 className="text-xl font-bold mt-8 mb-4">Course Breakdown</h2>
                <div className="grid gap-4">
                    {gradesData.map((item, i) => (
                        <Card key={i}>
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="min-w-[200px]">
                                        <h3 className="font-bold text-lg">{item.course}</h3>
                                        <p className="text-sm text-muted-foreground">{item.code}</p>
                                    </div>

                                    <div className="flex-1 max-w-sm w-full space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>Progress</span>
                                            <span className="font-bold">{item.score}%</span>
                                        </div>
                                        <Progress value={item.score} className="h-2" />
                                    </div>

                                    <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-800 w-12 h-12 rounded-lg font-bold text-xl">
                                        {item.grade}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </AppShell>
    );
}
