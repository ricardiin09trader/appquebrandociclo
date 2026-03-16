'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, ChevronRight, ChevronLeft, Target, Mail, Lock, 
  Eye, EyeOff, Loader2, AlertCircle, Shield, Zap
} from 'lucide-react';
import { AdminLoginScreen } from '@/components/AdminLoginScreen';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface LoginScreenProps {
  onComplete: (userId: string, userData: any) => void;
}

export function LoginScreen({ onComplete }: LoginScreenProps) {
  const [mode, setMode] = useState<'welcome' | 'login' | 'register'>('welcome');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao fazer login');
        setLoading(false);
        return;
      }

      onComplete(data.userId, data.user);
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (step < 3) {
      if (step === 1) {
        if (!name || !email || !password) {
          setError('Preencha todos os campos');
          return;
        }
        if (password !== confirmPassword) {
          setError('As senhas não coincidem');
          return;
        }
        if (password.length < 6) {
          setError('A senha deve ter pelo menos 6 caracteres');
          return;
        }
      }
      if (step === 2 && !weight) {
        setError('Informe seu peso atual');
        return;
      }
      setStep(step + 1);
      setError('');
      return;
    }

    if (!goalWeight) {
      setError('Informe sua meta de peso');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
          weight: parseFloat(weight),
          goalWeight: parseFloat(goalWeight),
          objective: 'lose',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao criar conta');
        setLoading(false);
        return;
      }

      onComplete(data.userId, data.user);
    } catch (err) {
      setError('Erro de conexão');
      setLoading(false);
    }
  };

  // Se deve mostrar a tela de admin
  if (showAdmin) {
    return (
      <AdminLoginScreen 
        onBack={() => setShowAdmin(false)} 
        onSuccess={() => {
          // Salva no localStorage que está logado como admin
          localStorage.setItem('adminLoggedIn', 'true');
          // Recarrega a página para mostrar o dashboard admin
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex flex-col">
      {/* Header */}
      <div className="text-center pt-12 pb-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl flex items-center justify-center shadow-xl"
        >
          <span className="text-4xl">🌱</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800">Quebrando Ciclo</h1>
        <p className="text-gray-500 text-sm mt-1">Sua jornada de transformação</p>
      </div>

      {/* Progress Steps (only for register) */}
      {mode === 'register' && (
        <div className="flex items-center justify-center gap-2 mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                s < step ? 'bg-green-500 text-white' : s === step ? 'bg-green-500 text-white shadow-lg' : 'bg-gray-200 text-gray-400'
              }`}>
                {s < step ? '✓' : s}
              </div>
              {s < 3 && <div className={`w-10 h-1 mx-1 rounded ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <AnimatePresence mode="wait">
          {/* Welcome Screen */}
          {mode === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <Card className="shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-center mb-6">Bem-vinda! 💚</h2>
                  
                  <div className="space-y-3">
                    <Button
                      onClick={() => setMode('login')}
                      className="w-full h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl text-lg"
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Entrar com Email
                    </Button>
                    
                    <Button
                      onClick={() => setMode('register')}
                      variant="outline"
                      className="w-full h-14 rounded-xl text-lg"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Criar Conta
                    </Button>
                  </div>

                  {/* Botão Admin */}
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setShowAdmin(true)}
                      className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-amber-600 transition-colors"
                    >
                      <Shield className="h-4 w-4" />
                      Acesso Admin
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 text-center mt-4">
                    Ao continuar, você aceita nossos termos de uso
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Login Screen */}
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <Card className="shadow-xl">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-center mb-6">Entrar 👋</h2>
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="seu@email.com"
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="password">Senha</Label>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Sua senha"
                          className="pl-10 pr-10 h-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      onClick={handleLogin}
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Entrar'}
                    </Button>

                    <button
                      onClick={() => { setMode('welcome'); setError(''); }}
                      className="w-full text-sm text-gray-500 hover:text-gray-700"
                    >
                      Voltar
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Register Screen */}
          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <Card className="shadow-xl">
                <CardContent className="p-6">
                  {/* Step 1: Dados pessoais */}
                  {step === 1 && (
                    <>
                      <h2 className="text-xl font-bold text-center mb-6">Criar Conta 🌟</h2>
                      
                      {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="reg-name">Nome</Label>
                          <div className="relative mt-1">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="reg-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Seu nome"
                              className="pl-10 h-12"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="reg-email">Email</Label>
                          <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="reg-email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="seu@email.com"
                              className="pl-10 h-12"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="reg-password">Senha</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="reg-password"
                              type={showPassword ? 'text' : 'password'}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              placeholder="Mínimo 6 caracteres"
                              className="pl-10 pr-10 h-12"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="reg-confirm">Confirmar Senha</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="reg-confirm"
                              type="password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              placeholder="Repita a senha"
                              className="pl-10 h-12"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Peso atual */}
                  {step === 2 && (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <span className="text-3xl">⚖️</span>
                        </div>
                        <h2 className="text-xl font-bold">Qual é seu peso atual?</h2>
                        <p className="text-gray-500 text-sm mt-1">Isso nos ajuda a personalizar sua experiência</p>
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="weight">Peso atual (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Ex: 70"
                            className="mt-1 h-14 text-lg text-center"
                          />
                        </div>

                        {weight && (
                          <div className="bg-blue-50 rounded-xl p-4 text-center">
                            <p className="text-sm text-blue-600">
                              💧 <strong>Meta de água:</strong> {Math.ceil((parseFloat(weight) * 35) / 250)} copos/dia
                            </p>
                            <p className="text-xs text-blue-500 mt-1">
                              ({Math.round(parseFloat(weight) * 35)}ml = peso × 35ml)
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Step 3: Meta de peso */}
                  {step === 3 && (
                    <>
                      <div className="text-center mb-6">
                        <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-4">
                          <Target className="h-8 w-8 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold">Qual é sua meta?</h2>
                        <p className="text-gray-500 text-sm mt-1">O objetivo que deseja alcançar</p>
                      </div>

                      {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 flex items-center gap-2 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {error}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="goalWeight">Peso meta (kg)</Label>
                          <Input
                            id="goalWeight"
                            type="number"
                            value={goalWeight}
                            onChange={(e) => setGoalWeight(e.target.value)}
                            placeholder="Ex: 60"
                            className="mt-1 h-14 text-lg text-center"
                          />
                        </div>

                        {weight && goalWeight && (
                          <div className="bg-gradient-to-r from-green-50 to-amber-50 rounded-xl p-4 text-center">
                            <p className="text-sm text-gray-700">
                              🎯 <strong>Olá, {name}!</strong>
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                              Você vai sair de <strong>{weight}kg</strong> e chegar a <strong>{goalWeight}kg</strong>
                            </p>
                            <p className="text-lg font-bold text-green-600 mt-2">
                              Perda de {(parseFloat(weight) - parseFloat(goalWeight)).toFixed(1)}kg 🌟
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Botões */}
                  <div className="flex gap-3 mt-6">
                    {step > 1 ? (
                      <>
                        <Button
                          onClick={() => setStep(step - 1)}
                          variant="outline"
                          className="flex-1 h-12"
                          disabled={loading}
                        >
                          <ChevronLeft className="mr-1 h-5 w-5" /> Voltar
                        </Button>
                        <Button
                          onClick={handleRegister}
                          className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600"
                          disabled={loading}
                        >
                          {loading ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                          ) : step === 3 ? (
                            <>
                              <span>Iniciar</span>
                              <Zap className="ml-1 h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Continuar <ChevronRight className="ml-1 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => { setMode('welcome'); setError(''); }}
                          variant="outline"
                          className="flex-1 h-12"
                        >
                          Voltar
                        </Button>
                        <Button
                          onClick={handleRegister}
                          className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600"
                        >
                          Continuar <ChevronRight className="ml-1 h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
