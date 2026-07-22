import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type View = 'onboarding' | 'dashboard' | 'phases' | 'phase-detail' | 'nutrition' | 'recipe-detail' | 'juice-detail' | 'mealplan' | 'workout' | 'achievements' | 'profile';

export interface UserData {
  name: string;
  email: string;
  weight: number;
  goalWeight: number;
  height: number;
}

interface CompletedLesson {
  phaseId: number;
  lessonId: number;
}

interface AppState {
  user: UserData | null;
  currentView: View;
  selectedPhase: number;
  selectedRecipeId: string | null;
  selectedJuiceId: string | null;
  completedLessons: CompletedLesson[];
  favorites: string[];
  waterGlasses: number;
  waterGoal: number;

  setView: (view: View) => void;
  selectPhase: (phaseId: number) => void;
  selectRecipe: (id: string | null) => void;
  selectJuice: (id: string | null) => void;
  completeOnboarding: (data: UserData) => void;
  completeLesson: (phaseId: number, lessonId: number) => void;
  isLessonCompleted: (phaseId: number, lessonId: number) => boolean;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setWaterGlasses: (glasses: number) => void;
  getCompletedCount: () => number;
  getPhaseCompletedCount: (phaseId: number) => number;
  updateProfile: (data: Partial<UserData>) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: null,
      currentView: 'onboarding',
      selectedPhase: 1,
      selectedRecipeId: null,
      selectedJuiceId: null,
      completedLessons: [],
      favorites: [],
      waterGlasses: 0,
      waterGoal: 10,

      setView: (view) => set({ currentView: view }),
      selectPhase: (phaseId) => set({ selectedPhase: phaseId, currentView: 'phase-detail' }),
      selectRecipe: (id) => set({ selectedRecipeId: id, currentView: 'recipe-detail' }),
      selectJuice: (id) => set({ selectedJuiceId: id, currentView: 'juice-detail' }),

      completeOnboarding: (data) => {
        const waterGoal = Math.ceil((data.weight * 35) / 250);
        set({ user: data, currentView: 'dashboard', waterGoal });
      },

      completeLesson: (phaseId, lessonId) => {
        const state = get();
        if (state.completedLessons.find(l => l.phaseId === phaseId && l.lessonId === lessonId)) return;
        set({ completedLessons: [...state.completedLessons, { phaseId, lessonId }] });
      },

      isLessonCompleted: (phaseId, lessonId) => {
        return get().completedLessons.some(l => l.phaseId === phaseId && l.lessonId === lessonId);
      },

      toggleFavorite: (id) => {
        const state = get();
        if (state.favorites.includes(id)) {
          set({ favorites: state.favorites.filter(f => f !== id) });
        } else {
          set({ favorites: [...state.favorites, id] });
        }
      },

      isFavorite: (id) => get().favorites.includes(id),

      setWaterGlasses: (glasses) => set({ waterGlasses: glasses }),

      getCompletedCount: () => get().completedLessons.length,

      getPhaseCompletedCount: (phaseId) => {
        return get().completedLessons.filter(l => l.phaseId === phaseId).length;
      },

      updateProfile: (data) => {
        const user = get().user;
        if (!user) return;
        const updated = { ...user, ...data };
        const waterGoal = Math.ceil((updated.weight * 35) / 250);
        set({ user: updated, waterGoal });
      },

      logout: () => {
        localStorage.removeItem('quebrando-ciclo-v2');
        set({ user: null, currentView: 'onboarding', completedLessons: [], favorites: [], waterGlasses: 0 });
      },
    }),
    { name: 'quebrando-ciclo-v2' }
  )
);
