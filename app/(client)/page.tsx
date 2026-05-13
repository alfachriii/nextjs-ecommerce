import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Container from "@/components/Container"
import HomeBanner from "@/components/HomeBanner"
import HomeCategories from "@/components/HomeCategories"
import ProductGrid from "@/components/ProductGrid"
import ShopByBrands from "@/components/ShopByBrands"

export default function Home() {
  return (
    <Container className="gap-8">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories />
      <ShopByBrands />
    </Container>
  );
}
