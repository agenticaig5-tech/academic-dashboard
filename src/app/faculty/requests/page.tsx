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

export default function FacultyRequestsPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            role: 'faculty',
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
            <AppShell role="faculty">
                <div className="flex h-full items-center justify-center">
                    <Card className="w-full max-w-md text-center p-8">
                        <div className="mx-auto w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                            <Send className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Request Forwarded</h2>
                        <p className="text-slate-500 mb-6">Your official request has been sent to HR/Admin. Please check your email for the signed copy.</p>
                        <Button onClick={() => setSuccess(false)}>Submit Another request</Button>
                    </Card>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell role="faculty">
            <div className="max-w-2xl mx-auto space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Faculty Service Requests</h1>
                    <p className="text-slate-500">Submit requests for leave, equipment, and documents.</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Draft Official Request</CardTitle>
                        <CardDescription>Select the requirement type.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="type">Request Category</Label>
                                <Select name="type" required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="duty_leave">Duty Leave / On-Duty (OD)</SelectItem>
                                        <SelectItem value="casual_leave">Casual Leave (CL)</SelectItem>
                                        <SelectItem value="personal_docs">Request Personal Documents</SelectItem>
                                        <SelectItem value="lab_equipment">Lab Equipment Requirement</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="recipient">Recipient Email</Label>
                                <Input
                                    type="email"
                                    name="recipient"
                                    placeholder="e.g. hr@college.edu"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="details">Letter Body / Details</Label>
                                <Textarea
                                    name="details"
                                    placeholder="I request permission to attend the Faculty Development Program on..."
                                    className="min-h-[150px]"
                                    required
                                />
                            </div>

                            <Button className="w-full" type="submit" disabled={loading}>
                                {loading ? 'submitting...' : 'Sign & Send Request'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}
