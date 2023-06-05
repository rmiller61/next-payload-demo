"use client"

import React, { useEffect, useState } from "react"
import AsyncSelect from "react-select/async"
import Stripe from "stripe"
import classes from './index.module.scss';

type Option = {
  label: string
  value: string
}

type FetchedProducts = {
  products: Stripe.Product[]
}

type Props = {
  label: string
}

const ProductLinker: React.FC = ({label}: Props) => {
  return (
    <div className={classes.productLinker}>
      <label className="field-label">{label}</label>
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
    </div>
  )
}

export default ProductLinker
