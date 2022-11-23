import Image from "next/future/image"
import Head from 'next/head'
import { useKeenSlider } from 'keen-slider/react'
import { GetStaticProps } from "next"
import Link from 'next/link'
import { Handbag } from "phosphor-react"
import { useShoppingCart } from "use-shopping-cart"
import { CartActions, Product as ProductCart } from "use-shopping-cart/core"
import Stripe from "stripe"

import 'keen-slider/keen-slider.min.css'

import { stripe } from "../lib/stripe"

import { AddToCartButton, HomeContainer, Product } from "../styles/pages/home"

function ProductListing({
  product,
  addItem
}: {
  product: ProductCart
  addItem: CartActions['addItem']
}) {

  function handleAddItem() {
    addItem(product)
  }

  return (
    <Product key={product.id} className="keen-slider__slide">
      <Link href={`/product/${product.id}`} prefetch={false}>
        <Image priority src={product.imageUrl} width={520} height={520} alt={product.name} />
      </Link>
      <footer>
        <div>
          <strong>{product.name}</strong>
          <span>{product.price}</span>
        </div>
          
        <AddToCartButton type="button" onClick={handleAddItem}>
          <Handbag size={32} color='#e1e1e6' weight="bold" />
        </AddToCartButton>
      </footer>
    </Product>
  )
}

export default function Home({ products }) {
  const cart = useShoppingCart()
  const { addItem } = cart

  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 1.6,
      spacing: 48,
    },
    breakpoints: {
      '(max-width: 610px)': {
        slides: {
          perView: 1.4,
          spacing: 18,
        },
      }
    }
  })
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <ProductListing key={product.id} product={product} addItem={addItem} />
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      description: product.description,
      defaultPriceId: price.id
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2 horas
  }
}