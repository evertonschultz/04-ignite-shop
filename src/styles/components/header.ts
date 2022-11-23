import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog'

export const HeaderContainer = styled('header', {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 0',
  paddingRight: '0.5rem',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
})

export const CartButton = styled('div', {
  display: 'flex',
  width: 48,
  height: 48,
  padding: 12,
  borderRadius: 6,
  background: '$gray800',

  alignItems: 'center',
  justifyContent: 'center',

  cursor: 'pointer',

  span: {
    borderRadius: '9999px',
    width: '24px',
    height: '24px',
    
    background: '$green500',
    color: '$white',
    fontSize: '0.75rem',
    fontWeight: '700',

    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',

    border: '3px solid $gray900',

    position: 'absolute',

    marginTop: '-2.188rem',
    marginRight: '-2.188rem',
  }
})

export const Content = styled(Dialog.Content, {
  minWidth: '32rem',
  borderRadius: '6px',
  padding: '0 3rem',
  paddingTop: '5.5rem',
  paddingBottom: '4rem',
  background: '$gray800',
  height: '100vh',

  position: 'fixed',
  top: '50%',
  left: '100%',
  transform: 'translate(-100%, -50%)',

  '@bp1': {
    minWidth: '22rem',
    paddingLeft: '1.5rem',
    paddingRight: '1.5rem'
  },
})

export const Overlay = styled(Dialog.Overlay, {
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,
  background: 'rgba(0, 0, 0, 0.75)',
})

export const CloseButton = styled(Dialog.Close, {
  position: 'absolute',
  background: 'transparent',
  border: 0,
  top: '1.5rem',
  right: '1.5rem',
  lineHeight: 0,
  cursor: 'pointer',
  color: '$gray-300',
})

export const ModalBody = styled('div', {
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '2rem',
})