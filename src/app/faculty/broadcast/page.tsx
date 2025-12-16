'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Send, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BroadcastPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            audience: formData.get('audience'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            priority: formData.get('priority')
        };

        try {
            const res = await fetch('/api/notify', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setSuccess(true);
                (e.target as HTMLFormElement).reset();
            } else {
                setError('Failed to send broadcast');
            }
        } catch (err) {
            setError('An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    }

    return (
        <AppShell role="faculty">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Broadcast Announcements</h1>
                    <p className="text-slate-500">Send emails and alerts to your students in bulk.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            Compose Message
                        </CardTitle>
                        <CardDescription>
                            This will be sent via email and appear in the student dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="broadcast-form" onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="audience">Target Audience</Label>
                                <Select name="audience" defaultValue="all">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select recipients" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Students (145)</SelectItem>
                                        <SelectItem value="cs101">CS101 - Intro to CS</SelectItem>
                                        <SelectItem value="ml202">ML202 - Machine Learning</SelectItem>
                                        <SelectItem value="graduating">Graduating Class</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="priority">Priority</Label>
                                <Select name="priority" defaultValue="normal">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low (Info)</SelectItem>
                                        <SelectItem value="normal">Normal</SelectItem>
                                        <SelectItem value="high">High (Urgent Alert)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input id="subject" name="subject" placeholder="e.g. Midterm Schedule Change" required />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Write your announcement here..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4 border-t pt-6">
                        {success && (
                            <Alert className="bg-green-50 text-green-800 border-green-200">
                                <CheckCircle2 className="h-4 w-4" />
                                <AlertTitle>Success</AlertTitle>
                                <AlertDescription>
                                    Broadcast sent successfully to 145 students.
                                </AlertDescription>
                            </Alert>
                        )}
                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <Button form="broadcast-form" className="w-full" disabled={loading}>
                            {loading ? 'Sending...' : (
                                <>
                                    <Send className="mr-2 w-4 h-4" /> Send Broadcast
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppShell>
    );
}
