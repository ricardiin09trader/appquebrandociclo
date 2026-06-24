'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface AdminLoginScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export function AdminLoginScreen({ onBack, onSuccess }: AdminLoginScreenProps) {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!password) {
      setError('Digite a senha de admin');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Senha incorreta');
        setLoading(false);
        return;
      }

      onSuccess();
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Acesso restrito</p>
        </div>

        {/* Form */}
        <Card className="shadow-2xl border-slate-700 bg-slate-800/50 backdrop-blur">
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-900/50 text-red-300 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="admin-password" className="text-slate-300">Senha de Admin</Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <Input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="pl-10 h-12 bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Acessar Painel'}
              </Button>

              <Button
                onClick={onBack}
                variant="ghost"
                className="w-full text-slate-400 hover:text-white"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar ao App
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
