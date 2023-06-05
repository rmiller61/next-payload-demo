"use client"

import React, { useEffect, useState } from "react"
import AsyncSelect from "react-select/async"
import Stripe from "stripe"

type Option = {
  label: string
  value: string
}

type FetchedProducts = {
  products: Stripe.Product[]
}

const ProductLinker: React.FC = () => {
  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={async () => {
        const products = fetch("/api/stripe/getProducts")
          .then((response) => response.json() as Promise<FetchedProducts>)
          .then(({ products }) => {
            //console.log(data)
            return products.map((product) => ({
              label: product.name,
              value: product.id,
            }))
          })
        return products
      }}
    />
  )
}

export default ProductLinker
