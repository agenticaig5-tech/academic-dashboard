'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, School } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-6xl">
            Academic Assistant AI
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Your intelligent companion for research, study, and grading.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Link href="/student" className="block h-full">
              <Card className="h-full cursor-pointer hover:border-blue-500 hover:shadow-lg transition-all border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 text-blue-600 dark:text-blue-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">Student</CardTitle>
                  <CardDescription>
                    Master your coursework with AI study plans and research help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-slate-500 dark:text-slate-400 text-left space-y-2">
                    <li>• Automated Study Schedules</li>
                    <li>• Research Paper Summarizer</li>
                    <li>• Assignment Helper</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="h-full"
          >
            <Link href="/faculty" className="block h-full">
              <Card className="h-full cursor-pointer hover:border-emerald-500 hover:shadow-lg transition-all border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-300">
                    <School className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-2xl">Faculty</CardTitle>
                  <CardDescription>
                    Streamline your administrative and teaching tasks.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-slate-500 dark:text-slate-400 text-left space-y-2">
                    <li>• Syllabus Generator</li>
                    <li>• Grading Assistant</li>
                    <li>• Lesson Plan Creator</li>
                  </ul>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
