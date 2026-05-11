export type ProductSlug = 'training' | 'nutrition' | 'bundle'

export const PRODUCTS: Record<ProductSlug, {
  slug: ProductSlug
  name: string
  shortName: string
  price: number
  priceDisplay: string
  oneLiner: string
  stripePriceEnv: string
  includes: ProductSlug[]
}> = {
  training: {
    slug: 'training',
    name: 'Training Blueprint',
    shortName: 'Training',
    price: 49,
    priceDisplay: '£49',
    oneLiner: 'Build your training brain.',
    stripePriceEnv: 'STRIPE_TRAINING_PRICE_ID',
    includes: ['training'],
  },
  nutrition: {
    slug: 'nutrition',
    name: 'Nutrition Blueprint',
    shortName: 'Nutrition',
    price: 39,
    priceDisplay: '£39',
    oneLiner: 'Stop guessing food.',
    stripePriceEnv: 'STRIPE_NUTRITION_PRICE_ID',
    includes: ['nutrition'],
  },
  bundle: {
    slug: 'bundle',
    name: 'Full Stack Bundle',
    shortName: 'Bundle',
    price: 69,
    priceDisplay: '£69',
    oneLiner: 'The whole education.',
    stripePriceEnv: 'STRIPE_BUNDLE_PRICE_ID',
    includes: ['training', 'nutrition'],
  },
}

export const BUNDLE_SAVES =
  PRODUCTS.training.price + PRODUCTS.nutrition.price - PRODUCTS.bundle.price // £19

export function entitlementsFor(slug: ProductSlug): ProductSlug[] {
  return PRODUCTS[slug].includes
}

export function crossSellFor(owned: ProductSlug[]): ProductSlug | null {
  if (owned.includes('training') && owned.includes('nutrition')) return null
  if (owned.includes('training')) return 'nutrition'
  if (owned.includes('nutrition')) return 'training'
  return null
}
