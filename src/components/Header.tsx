import { Handbag, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog'
import { useShoppingCart } from 'use-shopping-cart'
import Image from 'next/future/image'

import logoImg from '../assets/logo.svg'
import { CartButton, CloseButton, Content, HeaderContainer, Overlay, ModalBody } from "../styles/components/header"
import CartStripe from './CartStripe'

export default function Header() {
  const cart = useShoppingCart()
  const { cartDetails } = cart

  const amountOfItemsInCart = Object.values(cartDetails ?? {}).length;

  return (
    <HeaderContainer>
        <Image src={logoImg} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CartButton>
              <Handbag size={24} color='#e1e1e6' weight="bold" />
              {amountOfItemsInCart ? <span>{amountOfItemsInCart}</span> : false}
            </CartButton>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Overlay />

            <Content>
              <Dialog.Title>Sacola de compras</Dialog.Title>

              <CloseButton>
                <X size={24} />
              </CloseButton>

              <ModalBody>
                <CartStripe />
              </ModalBody>
            </Content>
          </Dialog.Portal>
        </Dialog.Root>
        
      </HeaderContainer>
  )
}