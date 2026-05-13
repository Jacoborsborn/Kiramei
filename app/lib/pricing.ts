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
    price: 49.99,
    priceDisplay: '£49.99',
    oneLiner: 'Build your training brain.',
    stripePriceEnv: 'STRIPE_TRAINING_PRICE_ID',
    includes: ['training'],
  },
  nutrition: {
    slug: 'nutrition',
    name: 'Nutrition Blueprint',
    shortName: 'Nutrition',
    price: 49.99,
    priceDisplay: '£49.99',
    oneLiner: 'Stop guessing food.',
    stripePriceEnv: 'STRIPE_NUTRITION_PRICE_ID',
    includes: ['nutrition'],
  },
  bundle: {
    slug: 'bundle',
    name: 'Full Stack Bundle',
    shortName: 'Bundle',
    price: 78.99,
    priceDisplay: '£78.99',
    oneLiner: 'The whole education.',
    stripePriceEnv: 'STRIPE_BUNDLE_PRICE_ID',
    includes: ['training', 'nutrition'],
  },
}

export const BUNDLE_SAVES = 20 // £20 off combined price

export function entitlementsFor(slug: ProductSlug): ProductSlug[] {
  return PRODUCTS[slug].includes
}

export function crossSellFor(owned: ProductSlug[]): ProductSlug | null {
  if (owned.includes('training') && owned.includes('nutrition')) return null
  if (owned.includes('training')) return 'nutrition'
  if (owned.includes('nutrition')) return 'training'
  return null
}
