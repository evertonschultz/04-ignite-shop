import { AppProps } from "next/app"
import { CartProvider } from 'use-shopping-cart'

import { globalStyles } from "../styles/global"

import { Container } from "../styles/pages/app"

globalStyles()

import Header from "../components/Header"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider
      cartMode='checkout-session'
      stripe={process.env.STRIPE_SECRET_KEY}
      currency="BRL"
    >
    <Container>
      <Header />

      <Component {...pageProps} />
    </Container>
    </CartProvider>
  )
}

