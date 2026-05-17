import Shop from "@/components/Shop"
import { getAllBrands, getCategories } from "@/sanity/queries";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();

  return (
    <main className="w-full min-h-screen my-24">
        <Shop categories={categories} brands={brands} />
    </main>
  )
}

export default ShopPage