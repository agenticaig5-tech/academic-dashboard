'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    MessageSquare,
    FileText,
    Settings,
    Menu,
    X,
    PlusCircle,
    Calendar,
    Send // Added
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
}

interface AppShellProps {
    children: React.ReactNode;
    role: 'student' | 'faculty';
}

export function AppShell({ children, role }: AppShellProps) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const studentNav: NavItem[] = [
        { title: 'Dashboard', href: '/student', icon: LayoutDashboard },
        { title: 'AI Tutor', href: '/student/chat', icon: MessageSquare },
        { title: 'Service Requests', href: '/student/requests', icon: FileText }, // Added
    ];

    const facultyNav: NavItem[] = [
        { title: 'Dashboard', href: '/faculty', icon: LayoutDashboard },
        { title: 'AI Assistant', href: '/faculty/chat', icon: MessageSquare }, // Added
        { title: 'Service Requests', href: '/faculty/requests', icon: FileText }, // Added
        { title: 'Broadcast Alerts', href: '/faculty/broadcast', icon: Send },
        { title: 'Timetable Generator', href: '/faculty/timetable', icon: Calendar },
    ];

    const navItems = role === 'student' ? studentNav : facultyNav;

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-white dark:bg-slate-900">
                <div className="p-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <span className="bg-blue-600 text-white p-1 rounded">AI</span>
                        <span>Academic</span>
                    </Link>
                    <div className="mt-2 text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full inline-block text-slate-500 uppercase">
                        {role} Workspace
                    </div>
                </div>
                <ScrollArea className="flex-1 py-6 px-4">
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                            >
                                <Button
                                    variant={pathname === item.href ? 'secondary' : 'ghost'}
                                    className={cn(
                                        "w-full justify-start gap-3",
                                        pathname === item.href && "bg-slate-100 dark:bg-slate-800"
                                    )}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </nav>
                </ScrollArea>
                <div className="p-4 border-t space-y-2">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500">
                        <Settings className="w-5 h-5" />
                        Settings
                    </Button>
                </div>
            </aside>

            {/* Mobile Sidebar (Sheet) */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-0">
                        <div className="p-6 border-b">
                            <span className="font-bold text-xl">Academic AI</span>
                        </div>
                        <div className="py-6 px-4 flex flex-col gap-2">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    <Button
                                        variant={pathname === item.href ? 'secondary' : 'ghost'}
                                        className="w-full justify-start gap-3"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.title}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                <div className="md:hidden h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-center">
                    <span className="font-bold">Academic Assistant</span>
                </div>
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
