'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Calendar, Copy } from 'lucide-react';

export default function TimetablePage() {
    const [loading, setLoading] = useState(false);
    const [timetable, setTimetable] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setTimetable(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('courseName'),
            faculty: formData.get('facultyName'),
            slots: formData.get('slots'), // Number of sessions per week
            preferences: formData.get('preferences'),
        };

        // Simulate AI Generation
        await new Promise(r => setTimeout(r, 1500));

        // Mock Markdown Table
        const generated = `
# Weekly Timetable: ${data.name}
**Instructor**: ${data.faculty}
**Load**: ${data.slots} Sessions/Week

| Time | Monday | Tuesday | Wednesday | Thursday | Friday |
|---|---|---|---|---|---|
| 09:00 - 10:00 (Period 1) | **${data.name}** | | | **${data.name}** | |
| 10:00 - 11:00 (Period 2) | | **${data.name}** | | | **${data.name}** |
| 11:00 - 12:00 (Period 3) | | | **${data.name}** | | |
| **Lunch Break** | --- | --- | --- | --- | --- |
| 13:00 - 14:00 (Period 5) | | | | | |
| 14:00 - 15:00 (Period 6) | | **${data.name} Lab** | | | |
| 15:00 - 16:00 (Period 7) | | | | | |

*Note: Schedule optimized based on preference: "${data.preferences}".*
    `;

        setTimetable(generated.trim());
        setLoading(false);
    }

    return (
        <AppShell role="faculty">
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Input Form */}
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Timetable Generator</h1>
                        <p className="text-slate-500">Automatically schedule your weekly periods.</p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Schedule Settings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form id="timetable-form" onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="courseName">Course Name</Label>
                                    <Input id="courseName" name="courseName" placeholder="e.g. Advanced Calculus" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="facultyName">Faculty Name</Label>
                                    <Input id="facultyName" name="facultyName" placeholder="e.g. Prof. Johnson" required />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="slots">Sessions Per Week</Label>
                                    <Select name="slots" required defaultValue="4">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select count" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="3">3 Sessions</SelectItem>
                                            <SelectItem value="4">4 Sessions</SelectItem>
                                            <SelectItem value="5">5 Sessions</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="preferences">Scheduling Preferences</Label>
                                    <Textarea
                                        id="preferences"
                                        name="preferences"
                                        placeholder="e.g. Avoid Monday mornings, prefer Afternoon labs..."
                                        className="min-h-[100px]"
                                        required
                                    />
                                </div>

                                <Button className="w-full" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>Scheduling...</>
                                    ) : (
                                        <><Calendar className="mr-2 w-4 h-4" /> Generate Timetable</>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Output Display */}
                <div className="space-y-6">
                    <div className="h-full">
                        <Card className="h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Weekly Grid</CardTitle>
                                {timetable && (
                                    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(timetable)}>
                                        <Copy className="w-4 h-4 mr-2" /> Copy
                                    </Button>
                                )}
                            </CardHeader>
                            <CardContent className="flex-1 min-h-[500px] bg-slate-50 dark:bg-slate-900 rounded-md m-4 p-4 font-mono text-sm whitespace-pre-wrap overflow-auto border">
                                {timetable ? timetable : (
                                    <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
                                        <Calendar className="w-12 h-12 opacity-50" />
                                        <p>Fill out settings to generate a schedule.</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </AppShell>
    );
}
