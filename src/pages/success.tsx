import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import Stripe from "stripe";
import { useShoppingCart } from "use-shopping-cart";
import { stripe } from "../lib/stripe";
import { ImageContainer, SuccessContainer, ImagesContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: {
    name: string;
    imageUrl: string;
  }[]
}

export default function Success({ customerName, products }: SuccessProps) {
  const cart = useShoppingCart()
  const { clearCart } = cart

  useEffect(() => {
    clearCart()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>
    
      <SuccessContainer>
        <h1>Compra efetuada!</h1>
      <ImagesContainer>
        {
          products.map(item => {
          return (
            <ImageContainer key={item.name}>
              <Image src={item.imageUrl} width={120} height={110} alt="" />
            </ImageContainer>
          )
          })
        }
        </ImagesContainer>

        <p>Uhuul <strong>{customerName}</strong>, sua compra de {products.length === 1 ? '1 camiseta' : `${products.length} camisetas`} já está a caminho da sua casa. </p>
      
        <Link href="/">
          Voltar ao catálago
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;
  const lineItems = session.line_items.data

  const lineItemsFormatted = lineItems.map(item => {
    return item.price.product as Stripe.Product
  })

  return {
    props: {
      customerName,
      products: lineItemsFormatted.map(item => {
        return {name: item.name, imageUrl: item.images[0]}
      })
    }
  }
}