import axios from 'axios'
import Image from 'next/future/image'
import { useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart'
import { CartActions, CartEntry as ICartEntry } from 'use-shopping-cart/core'
import { BuyButton, Footer, Item, ItemsContainer } from '../styles/components/cartStripe'

function CartEntry({
  entry,
  removeItem
}: {
  entry: ICartEntry
  removeItem: CartActions['removeItem']
}) {
  return (
    <Item>
      <Image width={95} height={95} src={entry.imageUrl} alt={entry.name} />
      <div>
        <span>{entry.name}</span>
        <strong>{entry.price}</strong>
        <button onClick={() => removeItem(entry.id)}>Remover</button>
      </div>
    </Item>
  )
}

function Cart() {
  const cart = useShoppingCart()
  const { removeItem, cartDetails } = cart

  const cartEntries = Object.values(cartDetails ?? {}).map((entry) => (
    <CartEntry key={entry.id} entry={entry} removeItem={removeItem} />
  ))

  const totalCart = Object.values(cartDetails ?? {}).reduce((acc, item) => {
    const valueWithDollar = String(item.price).split('$')
    const valueWithoutDollar = String(valueWithDollar[1]).split(',')
    const valueWithoutComma = parseInt(valueWithoutDollar[0] + valueWithoutDollar[1])
    return acc += valueWithoutComma
  }, 0)

  const totalCartFormatted = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCart / 100)

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  async function handleBuyProduct() {
    try {
      const products = Object.values(cartDetails ?? {}).map(item => {
        return {price: item.defaultPriceId, quantity: 1}
      })
      
      setIsCreatingCheckoutSession(true)

     const response = await axios.post('/api/checkout', {
       products,
     })

     const { checkoutUrl } = response.data;
     window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false)

      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <>
    <ItemsContainer>
      {cartEntries.length === 0 ? <p>Sua sacola está vazio.</p> : null}
      {cartEntries}
    </ItemsContainer>
    <Footer>
      <div><span>Quantidade</span><span>{cartEntries.length} itens</span></div>
      <div><strong>Valor total</strong><strong>{totalCartFormatted}</strong></div>

      <BuyButton disabled={isCreatingCheckoutSession} type="button" onClick={handleBuyProduct}>
        Finalizar compra
      </BuyButton>
    </Footer>
    </>
  )
}

export default function CartStripe() {
  return (
    <Cart />
  )
}
