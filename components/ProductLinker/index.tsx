"use client"

import React, { useEffect, useState } from "react"
import AsyncSelect from "react-select/async"
import Stripe from "stripe"
import classes from './index.module.scss';
import { useField } from 'payload/components/forms'
import { Props } from 'payload/components/fields/Json';

// we'll re-use the built in Label component directly from Payload
import { Label } from 'payload/components/forms';

type Option = {
  label: string
  value: string
}

type FetchedProducts = {
  products: Stripe.Product[]
}

type ProductDetails = Pick<Stripe.Product, "id" | "name">

const ProductLinker: React.FC = ({label, path = "product", required}: Props) => {

  const {setValue, value } = useField<ProductDetails>({ path })

  return (
    <div className={classes.productLinker}>
      <Label
        htmlFor={path}
        label={label}
        required={required}
      />
      <AsyncSelect
      cacheOptions
      defaultOptions
      defaultValue={value && {label: value.name, value: value.id}}
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
      onChange={(option: Option) => {
        setValue({
          id: option.value,
          name: option.label,
        })
      }
      }
    />
    </div>
  )
}

export default ProductLinker
