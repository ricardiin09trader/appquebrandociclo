'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, Clock, Flame, ChevronLeft, X, 
  ChefHat, Apple, Cookie, Utensils, Coffee, Cake
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAppStore } from '@/store/useAppStore';
import { recipes, type Recipe, type RecipeCategory } from '@/data/recipes';

// Category configurations
const categoryConfig: Record<RecipeCategory, { label: string; emoji: string; icon: typeof Coffee }> = {
  cafe_salgado: { label: 'Café Salgado', emoji: '🍳', icon: Coffee },
  cafe_doce: { label: 'Café Doce', emoji: '🥞', icon: Cake },
  principal: { label: 'Principal', emoji: '🍽️', icon: Utensils },
  lanche_doce: { label: 'Lanche Doce', emoji: '🍰', icon: Cookie },
  lanche_salgado: { label: 'Lanche Salgado', emoji: '🥪', icon: Apple },
};

const difficultyColors = {
  facil: 'bg-green-100 text-green-700 border-green-200',
  medio: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  dificil: 'bg-red-100 text-red-700 border-red-200',
};

const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

interface RecipesScreenProps {
  onBack: () => void;
  onSelectRecipe: (recipeId: string) => void;
}

export function RecipesScreen({ onBack, onSelectRecipe }: RecipesScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const { favorites, addFavorite, removeFavoriteByItem, isFavorite } = useAppStore();

  // Filter recipes based on search and category
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || recipe.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Get recipes count by category
  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = { all: recipes.length };
    recipes.forEach((recipe) => {
      counts[recipe.category] = (counts[recipe.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleToggleFavorite = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = isFavorite(recipe.id, undefined);
    if (isFav) {
      removeFavoriteByItem(recipe.id, undefined);
    } else {
      addFavorite({ recipeId: recipe.id });
    }
  };

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    onSelectRecipe(recipe.id);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-b-3xl sticky top-0 z-20">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <ChefHat className="h-6 w-6" />
              Receitas
            </h1>
            <p className="text-orange-100 text-sm">{recipes.length} receitas saudáveis</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-300" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar receitas..."
            className="pl-10 h-12 bg-white/20 border-0 text-white placeholder:text-orange-200 rounded-xl"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-orange-200" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-4 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
            }`}
          >
            Todas ({categoryCount.all})
          </button>
          {(Object.keys(categoryConfig) as RecipeCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-orange-300'
              }`}
            >
              <span>{categoryConfig[cat].emoji}</span>
              {categoryConfig[cat].label} ({categoryCount[cat] || 0})
            </button>
          ))}
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="px-4">
        {filteredRecipes.length === 0 ? (
          <div className="text-center py-12">
            <ChefHat className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">Nenhuma receita encontrada</p>
            <p className="text-sm text-gray-400">Tente outra busca ou categoria</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <AnimatePresence mode="popLayout">
              {filteredRecipes.map((recipe, index) => {
                const isFav = isFavorite(recipe.id, undefined);
                return (
                  <motion.div
                    key={recipe.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-lg transition-shadow overflow-hidden"
                      onClick={() => handleRecipeClick(recipe)}
                    >
                      <CardContent className="p-0">
                        {/* Recipe Header */}
                        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 relative">
                          <div className="absolute top-2 right-2">
                            <button
                              onClick={(e) => handleToggleFavorite(recipe, e)}
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                isFav 
                                  ? 'bg-red-100 text-red-500' 
                                  : 'bg-white/80 text-gray-400 hover:text-red-400'
                              }`}
                            >
                              <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
                            </button>
                          </div>
                          <div className="text-3xl mb-2">{categoryConfig[recipe.category].emoji}</div>
                          <Badge variant="secondary" className="bg-white/80 text-orange-600 border-0 text-xs">
                            {categoryConfig[recipe.category].label}
                          </Badge>
                        </div>

                        {/* Recipe Info */}
                        <div className="p-3">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 mb-2 min-h-[2.5rem]">
                            {recipe.name}
                          </h3>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                              <Flame className="h-3.5 w-3.5 text-orange-500" />
                              <span>{recipe.calories} kcal</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5 text-blue-500" />
                              <span>{recipe.prepTime} min</span>
                            </div>
                          </div>

                          <Badge 
                            variant="outline" 
                            className={`text-xs ${difficultyColors.facil}`}
                          >
                            Fácil
                          </Badge>
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

      {/* Recipe Detail Modal */}
      <AnimatePresence>
        {selectedRecipe && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setSelectedRecipe(null)}
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
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 relative">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{categoryConfig[selectedRecipe.category].emoji}</span>
                  <Badge className="bg-white/20 text-white border-0">
                    {categoryConfig[selectedRecipe.category].label}
                  </Badge>
                </div>
                <h2 className="text-xl font-bold">{selectedRecipe.name}</h2>
                <p className="text-orange-100 text-sm mt-1">{selectedRecipe.description}</p>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {/* Nutritional Info */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-orange-50 rounded-xl p-3 text-center">
                    <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
                    <p className="text-lg font-bold text-orange-600">{selectedRecipe.calories}</p>
                    <p className="text-xs text-gray-500">kcal</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-3 text-center">
                    <Clock className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                    <p className="text-lg font-bold text-blue-600">{selectedRecipe.prepTime}</p>
                    <p className="text-xs text-gray-500">minutos</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center">
                    <Utensils className="h-5 w-5 mx-auto text-green-500 mb-1" />
                    <p className="text-lg font-bold text-green-600">{selectedRecipe.servings}</p>
                    <p className="text-xs text-gray-500">porções</p>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-lg">🥗</span>
                    Ingredientes
                  </h3>
                  <ul className="space-y-2">
                    {selectedRecipe.ingredients.map((ingredient, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-1.5 flex-shrink-0" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">👨‍🍳</span>
                    Modo de Preparo
                  </h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, idx) => (
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
                {selectedRecipe.tips && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                      <span>💡</span> Dica
                    </h4>
                    <p className="text-sm text-amber-700">{selectedRecipe.tips}</p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t bg-white">
                <Button
                  onClick={(e) => handleToggleFavorite(selectedRecipe, e)}
                  className={`w-full h-12 rounded-xl font-semibold ${
                    isFavorite(selectedRecipe.id, undefined)
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-orange-500 hover:bg-orange-600 text-white'
                  }`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFavorite(selectedRecipe.id, undefined) ? 'fill-current' : ''}`} />
                  {isFavorite(selectedRecipe.id, undefined) ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default RecipesScreen;
