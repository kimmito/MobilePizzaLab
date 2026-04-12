import Catalog from "@/components/ui/catalog/Catalog"
import Loader from "@/components/ui/Loader"
import React, { FC } from "react"
import { useProducts } from "./useProducts"

const Products: FC =() => {
  const {isLoading, products} = useProducts()
  return isLoading ? (
    <Loader />
  ) :  (
    <Catalog title="Пиццы" products={products || []} />
  )
}

export default Products