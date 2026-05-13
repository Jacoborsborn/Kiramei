import { WEEK_DATA } from './nutrition-week-data'

export type MindMapNode = { label: string; sub?: string; x: string; y: string; tone?: 'sage' | 'wheat' | 'accent' }
export type MindMapAnnotation = { text: string; x: string; y: string; rot: number; color: 'red' | 'blue' }
export type LibraryItem = { name: string; tag: string; tone: 'sage' | 'wheat' | 'red' | 'cream' | 'ink'; desc: string }
export type MealDay = { d: string; l: string; rows: [string, string][] }
export type QuizQuestion = { q: string; opts: string[]; correct: number; why: string }

export type NutritionWeek = {
  num: number
  phase: string
  title: string
  hero: { lead: string; emphasis: string }
  lede: string
  hook: { icon: string; text: string }
  stats: { l: string; v: string }[]
  brief: { doThis: string[]; doNot: string[] }
  mindMap: { center: string; nodes: MindMapNode[]; annotations: MindMapAnnotation[] }
  library: { title: string; caption: string; items: LibraryItem[] }
  lesson: { title: string; paragraphs: string[]; kiraNote: string }
  tool?: 'tdee' | 'macros' | 'protein-compare' | 'meal-prep' | 'deficit' | 'surplus' | 'plan-builder'
  plate?: { title: string; caption: string } | null
  mealPlan?: { title: string; days: MealDay[] } | null
  quiz: QuizQuestion[]
  reflection: string
}

export const NUTRITION_WEEKS = WEEK_DATA as NutritionWeek[]
