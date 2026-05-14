import { createSupabaseServiceClient } from '@/lib/supabase-server'
import ProductsClient from './ProductsClient'

export const revalidate = 30

export default async function ProductsPage() {
  const supabase = createSupabaseServiceClient()
  const { data: products } = await supabase
    .from('kira_products')
    .select('*')
    .order('id')

  return <ProductsClient products={products ?? []} />
}
