'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, Clock, ChevronLeft, X, 
  GlassWater, Sparkles, Droplets
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { juices, type Juice } from '@/data/juices';

interface JuicesScreenProps {
  onBack: () => void;
  onSelectJuice: (juiceId: string) => void;
}

export function JuicesScreen({ onBack, onSelectJuice }: JuicesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJuice, setSelectedJuice] = useState<Juice | null>(null);
  const { favorites, addFavorite, removeFavoriteByItem, isFavorite } = useAppStore();

  // Filter juices based on search
  const filteredJuices = useMemo(() => {
    return juices.filter((juice) => {
      return juice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
             juice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
             juice.benefits.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()));
    });
  }, [searchQuery]);

  const handleToggleFavorite = (juice: Juice, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = isFavorite(undefined, juice.id);
    if (isFav) {
      removeFavoriteByItem(undefined, juice.id);
    } else {
      addFavorite({ juiceId: juice.id });
    }
  };

  const handleJuiceClick = (juice: Juice) => {
    setSelectedJuice(juice);
    onSelectJuice(juice.id);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-500 to-green-600 text-white p-6 rounded-b-3xl sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <GlassWater className="h-6 w-6" />
              Sucos Detox
            </h1>
            <p className="text-lime-100 text-sm">{juices.length} receitas detoxificantes</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-lime-300" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar sucos..."
            className="pl-10 h-12 bg-white/20 border-0 text-white placeholder:text-lime-200 rounded-xl"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-lime-200" />
            </button>
          )}
        </div>
      </div>

      {/* Benefits Banner */}
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-r from-lime-50 to-green-50 border-lime-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-lime-100 rounded-xl flex items-center justify-center text-2xl">
                🌿
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Benefícios dos Sucos Detox</h3>
                <p className="text-sm text-gray-600">Hidratação, desintoxicação e nutrição em um copo!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Juices Grid */}
      <div className="px-4">
        {filteredJuices.length === 0 ? (
          <div className="text-center py-12">
            <GlassWater className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhum suco encontrado</p>
            <p className="text-sm text-gray-400">Tente outra busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredJuices.map((juice, index) => {
                const isFav = isFavorite(undefined, juice.id);
                return (
                  <motion.div
                    key={juice.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                      onClick={() => handleJuiceClick(juice)}
                    >
                      <CardContent className="p-0">
                        {/* Juice Header */}
                        <div className="bg-gradient-to-br from-lime-50 to-green-50 p-3 relative">
                          <div className="absolute top-2 right-2">
                            <button
                              onClick={(e) => handleToggleFavorite(juice, e)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isFav 
                                  ? 'bg-red-100 text-red-500' 
                                  : 'bg-white/80 text-gray-400 hover:text-red-400'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                          <div className="text-3xl mb-2">🥤</div>
                          <Badge variant="secondary" className="bg-white/80 text-lime-600 border-0 text-xs">
                            <Sparkles className="h-3 w-3 mr-1" />
                            Detox
                          </Badge>
                        </div>

                        {/* Juice Info */}
                        <div className="p-3">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
                            {juice.name}
                          </h3>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-lime-500" />
                              <span>{juice.prepTime} min</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Droplets className="h-3.5 w-3.5 text-blue-500" />
                              <span>Hidratante</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Juice Detail Modal */}
      <AnimatePresence>
        {selectedJuice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setSelectedJuice(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white w-full max-w-lg rounded-t-3xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-lime-500 to-green-600 text-white p-6 relative">
                <button
                  onClick={() => setSelectedJuice(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">🥤</span>
                  <Badge className="bg-white/20 text-white border-0">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Detox
                  </Badge>
                </div>
                <h2 className="text-xl font-bold">{selectedJuice.name}</h2>
                <p className="text-lime-100 text-sm mt-1">{selectedJuice.description}</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Prep Time */}
                <div className="flex justify-center mb-6">
                  <div className="bg-lime-50 rounded-xl px-6 py-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-lime-500" />
                    <span className="font-semibold text-lime-700">{selectedJuice.prepTime} minutos</span>
                    <span className="text-lime-600">de preparo</span>
                  </div>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-lime-100 rounded-lg flex items-center justify-center text-lg">✨</span>
                    Benefícios
                  </h3>
                  <ul className="space-y-2">
                    {selectedJuice.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-lime-400 rounded-full mt-1.5 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-lg">🥬</span>
                    Ingredientes
                  </h3>
                  <ul className="space-y-2">
                    {selectedJuice.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full mt-1.5 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">🧉</span>
                    Modo de Preparo
                  </h3>
                  <ol className="space-y-3">
                    {selectedJuice.instructions.map((instruction, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-600 text-sm">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="pt-0.5">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Tips */}
                <div className="bg-lime-50 border border-lime-200 rounded-xl p-4">
                  <h4 className="font-semibold text-lime-800 mb-1 flex items-center gap-2">
                    <span>💡</span> Dica
                  </h4>
                  <p className="text-sm text-lime-700">
                    Beba imediatamente após o preparo para aproveitar todos os nutrientes. 
                    Sucos detox são melhores consumidos em jejum ou entre refeições.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t bg-white">
                <Button
                  onClick={(e) => handleToggleFavorite(selectedJuice, e)}
                  className={`w-full h-12 rounded-xl font-semibold ${
                    isFavorite(undefined, selectedJuice.id)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-lime-500 hover:bg-lime-600 text-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(undefined, selectedJuice.id) ? 'fill-current' : ''}`} />
                  {isFavorite(undefined, selectedJuice.id) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default JuicesScreen;
