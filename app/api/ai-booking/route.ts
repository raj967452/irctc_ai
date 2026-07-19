import { NextResponse } from 'next/server';
export async function POST(request: Request) { const body = await request.json().catch(() => ({})); return NextResponse.json({ intent: body.prompt ?? 'book ticket', suggestions: ['Fastest train', 'Best waitlist probability', 'Lower-cost alternate'], latencyBudgetMs: 250 }); }
