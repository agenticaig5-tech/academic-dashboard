'use client';

import { useChat } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface ChatInterfaceProps {
    role: 'student' | 'faculty';
    initialMessage?: string;
}

export function ChatInterface({ role, initialMessage }: ChatInterfaceProps) {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        api: '/api/chat',
        body: { role },
        initialMessages: initialMessage ? [{
            id: 'init',
            role: 'assistant',
            content: initialMessage
        }] : []
    });

    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-[600px] border rounded-xl bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b bg-slate-50 dark:bg-slate-800 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300">
                    <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-semibold">AI Academic Assistant</h3>
                    <p className="text-xs text-slate-500">
                        {role === 'student' ? 'Study Planner & Research Helper' : 'Syllabus & Grading Assistant'}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {messages.length === 0 && !initialMessage && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50 space-y-4">
                            <Sparkles className="w-12 h-12 text-slate-300" />
                            <p>Ask me anything about your studies or tasks!</p>
                        </div>
                    )}
                    {messages.map((m) => (
                        <div
                            key={m.id}
                            className={cn(
                                "flex gap-3",
                                m.role === 'user' ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            <Avatar className="w-8 h-8 mt-1">
                                <AvatarFallback className={m.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-100 text-blue-700"}>
                                    {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                </AvatarFallback>
                            </Avatar>
                            <div
                                className={cn(
                                    "p-3 rounded-2xl max-w-[80%] text-sm",
                                    m.role === 'user'
                                        ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-tr-none shadow-md"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
                                )}
                            >
                                {m.content}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <Avatar className="w-8 h-8 mt-1">
                                <AvatarFallback className="bg-blue-100 text-blue-700">
                                    <Bot className="w-4 h-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-none">
                                <span className="flex gap-1">
                                    <span className="animate-bounce">.</span>
                                    <span className="animate-bounce delay-75">.</span>
                                    <span className="animate-bounce delay-150">.</span>
                                </span>
                            </div>
                        </div>
                    )}
                    <div ref={scrollRef} />
                </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t bg-white dark:bg-slate-900">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        placeholder={`Ask about ${role === 'student' ? 'assignments' : 'grading'}...`}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
