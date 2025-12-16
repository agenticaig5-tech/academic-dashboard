'use client';

import { AppShell } from '@/components/app-shell';
import { ChatInterface } from '@/components/chat-interface';

export default function FacultyChatPage() {
    return (
        <AppShell role="faculty">
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h1 className="text-2xl font-bold">Faculty Assistant AI</h1>
                    <p className="text-slate-500">Generate syllabi, grading rubrics, or research grant proposals.</p>
                </div>
                <ChatInterface role="faculty" />
            </div>
        </AppShell>
    );
}
