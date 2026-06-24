import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { secret } = await request.json();

    const adminSecret = process.env.ADMIN_SECRET || 'quebrando-ciclo-admin-2024';

    if (secret === adminSecret) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: 'Senha incorreta' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro interno' },
      { status: 500 }
    );
  }
}
