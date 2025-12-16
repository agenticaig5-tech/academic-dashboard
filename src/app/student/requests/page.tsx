'use client';

import { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Send } from 'lucide-react';

export default function StudentRequestsPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            role: 'student',
            type: formData.get('type'),
            recipient: formData.get('recipient'),
            details: formData.get('details')
        };

        await fetch('/api/requests', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 1000);
    }

    if (success) {
        return (
            <AppShell role="student">
                <div className="flex h-full items-center justify-center">
                    <Card className="w-full max-w-md text-center p-8">
                        <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
                        <p className="text-slate-500 mb-6">Your request has been forwarded to the authorities. You will be notified once approved.</p>
                        <Button onClick={() => setSuccess(false)}>Submit Another request</Button>
                    </Card>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell role="student">
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Service Requests</h1>
                    <p className="text-slate-500">Request official documents and permissions.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Draft New Request</CardTitle>
                        <CardDescription>Select the type of document you need.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Request Type</Label>
                                <Select name="type" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select document type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bonafide">Bonafide Certificate</SelectItem>
                                        <SelectItem value="internship">Internship Permission Letter</SelectItem>
                                        <SelectItem value="medical">Medical Leave Application</SelectItem>
                                        <SelectItem value="transcript">Official Transcript</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipient">Recipient Email</Label>
                                <Input
                                    type="email"
                                    name="recipient"
                                    placeholder="e.g. principal@college.edu"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="details">Additional Details / Purpose</Label>
                                <Textarea
                                    name="details"
                                    placeholder="Please allow me to attend the Internship at Google from..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading ? 'Processing...' : 'Generate & Send Request'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
