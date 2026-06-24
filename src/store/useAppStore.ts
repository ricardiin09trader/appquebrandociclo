import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  profile?: {
    weight: number;
    height: number;
    goalWeight: number;
    objective: string;
    activityLevel: string;
  };
  progress?: {
    xp: number;
    level: number;
    currentPhase: number;
    streak: number;
    totalDays: number;
    phase1Progress: number;
    phase2Progress: number;
    phase3Progress: number;
    phase4Progress: number;
    phase5Progress: number;
  };
}

export interface Favorite {
  id: string;
  recipeId?: string;
  juiceId?: string;
  createdAt: string;
}

interface AppState {
  user: User | null;
  userId: string | null;
  isLoggedIn: boolean;
  currentView: 'welcome' | 'onboarding' | 'login' | 'register' | 'dashboard' | 'phases' | 'phase-content' | 'recipes' | 'recipe-detail' | 'juices' | 'juice-detail' | 'mealplan' | 'water' | 'profile' | 'achievements' | 'workout' | 'admin';
  selectedPhase: number;
  selectedRecipe: string | null;
  selectedJuice: string | null;
  selectedMealDay: number;
  favorites: Favorite[];
  
  // Actions
  setUser: (user: User | null) => void;
  setUserId: (userId: string | null) => void;
  login: (user: User, userId: string) => void;
  logout: () => void;
  setCurrentView: (view: AppState['currentView']) => void;
  setSelectedPhase: (phase: number) => void;
  setSelectedRecipe: (recipeId: string | null) => void;
  setSelectedJuice: (juiceId: string | null) => void;
  setSelectedMealDay: (day: number) => void;
  updateUserProgress: (progress: Partial<NonNullable<User['progress']>>) => void;
  
  // Favorites
  addFavorite: (favorite: Omit<Favorite, 'id' | 'createdAt'>) => void;
  removeFavorite: (favoriteId: string) => void;
  removeFavoriteByItem: (recipeId?: string, juiceId?: string) => void;
  isFavorite: (recipeId?: string, juiceId?: string) => boolean;
  getFavoriteId: (recipeId?: string, juiceId?: string) => string | null;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      userId: null,
      isLoggedIn: false,
      currentView: 'welcome',
      selectedPhase: 1,
      selectedRecipe: null,
      selectedJuice: null,
      selectedMealDay: 1,
      favorites: [],

      setUser: (user) => set({ user }),
      setUserId: (userId) => set({ userId }),
      login: (user, userId) => set({ user, userId, isLoggedIn: true, currentView: 'dashboard' }),
      logout: () => set({ user: null, userId: null, isLoggedIn: false, currentView: 'welcome', favorites: [] }),
      setCurrentView: (view) => set({ currentView: view }),
      setSelectedPhase: (phase) => set({ selectedPhase: phase }),
      setSelectedRecipe: (recipeId) => set({ selectedRecipe: recipeId }),
      setSelectedJuice: (juiceId) => set({ selectedJuice: juiceId }),
      setSelectedMealDay: (day) => set({ selectedMealDay: day }),
      updateUserProgress: (progress) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, progress: { ...state.user.progress!, ...progress } }
            : null,
        })),

      // Favorites actions
      addFavorite: (favorite) =>
        set((state) => ({
          favorites: [
            ...state.favorites,
            {
              ...favorite,
              id: `fav_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      removeFavorite: (favoriteId) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== favoriteId),
        })),

      removeFavoriteByItem: (recipeId, juiceId) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => !(f.recipeId === recipeId && f.juiceId === juiceId)
          ),
        })),

      isFavorite: (recipeId, juiceId) => {
        const state = get();
        return state.favorites.some(
          (f) => f.recipeId === recipeId && f.juiceId === juiceId
        );
      },

      getFavoriteId: (recipeId, juiceId) => {
        const state = get();
        const favorite = state.favorites.find(
          (f) => f.recipeId === recipeId && f.juiceId === juiceId
        );
        return favorite?.id || null;
      },
    }),
    {
      name: 'quebrando-ciclo-storage',
      partialize: (state) => ({
        user: state.user,
        userId: state.userId,
        isLoggedIn: state.isLoggedIn,
        favorites: state.favorites,
      }),
    }
  )
);
