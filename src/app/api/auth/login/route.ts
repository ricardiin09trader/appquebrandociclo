import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email e senha são obrigatórios' },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { email },
      include: {
        profile: true,
        progress: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Email ou senha incorretos' },
        { status: 401 }
      );
    }

    // Atualizar última atividade
    await db.user.update({
      where: { id: user.id },
      data: { lastActivity: new Date() },
    });

    // Verificar e atualizar streak
    if (user.progress) {
      const lastCheckIn = user.progress.lastCheckIn;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (lastCheckIn) {
        const lastCheck = new Date(lastCheckIn);
        lastCheck.setHours(0, 0, 0, 0);
        
        const diffDays = Math.floor((today.getTime() - lastCheck.getTime()) / (1000 * 60 * 60 * 24));
        
        // Se passou mais de 1 dia sem check-in, resetar streak
        if (diffDays > 1) {
          await db.userProgress.update({
            where: { userId: user.id },
            data: { streak: 0 },
          });
        }
      }
    }

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: 'Login realizado com sucesso!',
      user: userWithoutPassword,
      userId: user.id,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
