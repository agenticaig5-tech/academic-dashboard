'use client';

import { AppShell } from '@/components/app-shell';
import { ChatInterface } from '@/components/chat-interface';

export default function StudentChatPage() {
    return (
        <AppShell role="student">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">AI Study Tutor</h1>
                    <p className="text-slate-500">Ask questions about your courses, research topics, or schedule.</p>
                </div>
                <ChatInterface role="student" />
            </div>
        </AppShell>
    );
}
