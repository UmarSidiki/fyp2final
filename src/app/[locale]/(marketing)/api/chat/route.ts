// app/api/chat/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Build a system-style instruction
  const systemMessage = {
    role: 'user',
    parts: [
      {
        text:
          'You are a local travel assistant that ONLY gives short answers about tourist attractions, tips, and destinations within Pakistan. '
          + 'If the user asks about another country, respond: \'Sorry, I can only help with places in Pakistan.\'',
      },
    ],
  };

  const chatHistory = messages.map((msg: any) => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  const contents = [systemMessage, ...chatHistory];

  const response = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyB7V0oP2dkEElEmPlRaGnYq34BojWk6dho',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 150, // Keeps answers short
        },
      }),
    },
  );

  const data = await response.json();

  return NextResponse.json({
    message:
      data?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Sorry, no response received from Gemini.',
  });
}
