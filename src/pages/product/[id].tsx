import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/future/image";
import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import Head from "next/head";
import { useShoppingCart } from "use-shopping-cart";
import { CartActions, Product as ProductCart } from "use-shopping-cart/core";

import { ImageContainer, ProductContainer, ProductDetails } from "../../styles/pages/product";

function ProductListing({
  product,
  addItem
}: {
  product: ProductCart
  addItem: CartActions['addItem']
}) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} width={520} height={520} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>

        <button onClick={() => addItem(product)}>
          Colocar na sacola
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export default function Product({ product }) {
  const cart = useShoppingCart()
  const { addItem } = cart

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
    
      <ProductListing product={product} addItem={addItem} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidios / mais acessados

  return {
    paths: [
      { params: { id: 'prod_MdJ3IgA1G3FbXw' } }
    ],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}