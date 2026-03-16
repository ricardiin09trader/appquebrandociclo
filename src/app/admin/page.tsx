'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Activity, TrendingUp, AlertTriangle, Trash2, 
  Eye, EyeOff, RefreshCw, BarChart3, Calendar, ChevronLeft,
  XCircle, CheckCircle, Clock, Flame, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ADMIN_SECRET = 'quebrando-ciclo-admin-2024';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  lastActivity: string;
  daysSinceActivity: number;
  profile: {
    weight: number;
    goalWeight: number;
    weightToLose: number;
    objective: string;
  } | null;
  progress: {
    xp: number;
    level: number;
    streak: number;
    totalDays: number;
    currentPhase: number;
  } | null;
  todayCheckIn: any;
  achievementsCount: number;
}

interface Stats {
  totalUsers: number;
  activeToday: number;
  activeThisWeek: number;
  inactiveUsers: number;
  totalCheckIns: number;
  totalXP: number;
  avgStreak: number;
  last7Days: { date: string; newUsers: number }[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'inactive'>('dashboard');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const authenticate = () => {
    if (adminKey === ADMIN_SECRET) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      alert('Chave incorreta!');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        fetch(`/api/admin/users?adminKey=${ADMIN_SECRET}&action=stats`),
        fetch(`/api/admin/users?adminKey=${ADMIN_SECRET}&action=list`),
      ]);
      
      const statsData = await statsRes.json();
      const usersData = await usersRes.json();
      
      setStats(statsData);
      setUsers(usersData.users || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
    setLoading(false);
  };

  const cleanupInactive = async () => {
    if (!confirm('Tem certeza que deseja excluir todos os usuários inativos há mais de 4 dias?')) return;
    
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?adminKey=${ADMIN_SECRET}&action=cleanup`);
      const data = await res.json();
      alert(data.message);
      fetchData();
    } catch (error) {
      console.error('Erro:', error);
    }
    setLoading(false);
  };

  const deleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Tem certeza que deseja excluir ${userName}?`)) return;
    
    try {
      await fetch(`/api/admin/users?adminKey=${ADMIN_SECRET}&userId=${userId}`, {
        method: 'DELETE',
      });
      alert('Usuário excluído!');
      fetchData();
      setSelectedUser(null);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  // Tela de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">🔐</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">Quebrando Ciclo</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Chave de acesso"
                  className="h-12"
                  onKeyDown={(e) => e.key === 'Enter' && authenticate()}
                />
              </div>
              <Button onClick={authenticate} className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500">
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold">📊 Admin Dashboard</h1>
          <p className="text-purple-100 text-sm">Gerenciamento do Quebrando Ciclo</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex gap-2 p-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'users', label: 'Usuárias', icon: Users },
            { id: 'inactive', label: 'Inativas', icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id 
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200' 
                  : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
          
          <button
            onClick={fetchData}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto p-4">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div className="space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-4">
                  <Users className="h-8 w-8 mb-2 opacity-80" />
                  <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm opacity-80">Total de Usuárias</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-4">
                  <Activity className="h-8 w-8 mb-2 opacity-80" />
                  <p className="text-3xl font-bold">{stats.activeToday}</p>
                  <p className="text-sm opacity-80">Ativas Hoje</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                <CardContent className="p-4">
                  <Flame className="h-8 w-8 mb-2 opacity-80" />
                  <p className="text-3xl font-bold">{stats.avgStreak}</p>
                  <p className="text-sm opacity-80">Média Streak</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="p-4">
                  <AlertTriangle className="h-8 w-8 mb-2 opacity-80" />
                  <p className="text-3xl font-bold">{stats.inactiveUsers}</p>
                  <p className="text-sm opacity-80">Inativas (+4 dias)</p>
                </CardContent>
              </Card>
            </div>

            {/* Additional Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-purple-500" />
                    Novas Usuárias (7 dias)
                  </h3>
                  <div className="flex items-end gap-2 h-32">
                    {stats.last7Days.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all"
                          style={{ height: `${Math.max(day.newUsers * 20, 4)}px` }}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(day.date).toLocaleDateString('pt-BR', { weekday: 'short' })}
                        </p>
                        <p className="text-sm font-bold">{day.newUsers}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Resumo Geral
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Check-ins</span>
                      <span className="font-bold">{stats.totalCheckIns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">XP Total Distribuído</span>
                      <span className="font-bold">{stats.totalXP.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Ativas Esta Semana</span>
                      <span className="font-bold">{stats.activeThisWeek}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Taxa de Engajamento</span>
                      <span className="font-bold">
                        {stats.totalUsers > 0 ? Math.round((stats.activeThisWeek / stats.totalUsers) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cleanup Button */}
            {stats.inactiveUsers > 0 && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="font-semibold text-red-800">Limpeza Automática</p>
                      <p className="text-sm text-red-600">{stats.inactiveUsers} usuárias inativas há mais de 4 dias</p>
                    </div>
                  </div>
                  <Button onClick={cleanupInactive} variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Limpar Inativas
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">{users.length} usuárias cadastradas</p>
              <Input
                placeholder="Buscar por nome ou email..."
                className="w-64"
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  // Filter logic here
                }}
              />
            </div>

            <div className="grid gap-3">
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelectedUser(user)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-bold">{user.progress?.xp || 0} XP</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Flame className="h-3 w-3 text-orange-500" />
                            {user.progress?.streak || 0} dias
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.daysSinceActivity <= 1 ? 'bg-green-100 text-green-700' :
                          user.daysSinceActivity <= 3 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {user.daysSinceActivity === 0 ? 'Hoje' : 
                           user.daysSinceActivity === 1 ? 'Ontem' :
                           `${user.daysSinceActivity} dias`}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Tab */}
        {activeTab === 'inactive' && (
          <div className="space-y-4">
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-800">Usuárias Inativas</p>
                    <p className="text-sm text-red-600">Sem atividade há mais de 4 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-3">
              {users.filter(u => u.daysSinceActivity > 4).map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-red-500 font-medium">
                        {user.daysSinceActivity} dias inativa
                      </span>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUser(user.id, user.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Ficha da Usuária</h2>
                  <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-600">
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                {/* User Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                    <p className="text-gray-500">{selectedUser.email}</p>
                    <p className="text-xs text-gray-400">
                      Cadastrada em {new Date(selectedUser.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>

                {/* Profile */}
                {selectedUser.profile && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      📊 Perfil
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Peso Atual</p>
                        <p className="font-bold text-lg">{selectedUser.profile.weight} kg</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Meta</p>
                        <p className="font-bold text-lg">{selectedUser.profile.goalWeight} kg</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">A Perder</p>
                        <p className="font-bold text-lg text-green-600">{selectedUser.profile.weightToLose} kg</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Objetivo</p>
                        <p className="font-bold">{selectedUser.profile.objective === 'lose' ? 'Emagrecer' : 'Manter'}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progress */}
                {selectedUser.progress && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      🏆 Progresso
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-purple-600">{selectedUser.progress.xp}</p>
                        <p className="text-xs text-purple-500">XP Total</p>
                      </div>
                      <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-amber-600">{selectedUser.progress.level}</p>
                        <p className="text-xs text-amber-500">Nível</p>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/30 p-3 rounded-lg text-center">
                        <p className="text-2xl font-bold text-orange-600">{selectedUser.progress.streak}</p>
                        <p className="text-xs text-orange-500">Streak</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Today's Check-in */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    ✅ Check-in de Hoje
                  </h4>
                  {selectedUser.todayCheckIn ? (
                    <div className="flex gap-2 flex-wrap">
                      {selectedUser.todayCheckIn.drankWater && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">💧 Água</span>}
                      {selectedUser.todayCheckIn.followedMeal && <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">🥗 Refeição</span>}
                      {selectedUser.todayCheckIn.readContent && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">📚 Conteúdo</span>}
                      {selectedUser.todayCheckIn.exercised && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">🏃 Exercício</span>}
                      {selectedUser.todayCheckIn.mindfulness && <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">🧘 Mindfulness</span>}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">Nenhum check-in hoje</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => deleteUser(selectedUser.id, selectedUser.name)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir Usuária
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
