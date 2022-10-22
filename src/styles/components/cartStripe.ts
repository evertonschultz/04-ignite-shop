import { styled } from "..";

export const ItemsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  p: {
    display: 'flex',
    alignSelf: 'center',
    fontStyle: 'italic'
  }
})

export const Item = styled('div', {
  display: 'flex',
  gap: 20,

  img: {
    background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
    borderRadius: 8,
    width: 95,
    height: 95,
  },

  div: {
    display: 'flex',
    flexDirection: 'column',

    span: {
      color: '$gray300',
      fontSize: '$md',
      lineHeight: 1.6,
    },

    strong: {
      color: '$gray100',
      fontSize: '$md',
      lineHeight: 1.6,
    },

    button: {
      border: 0,
      background: 'transparent',
      width: 65,

      fontSize: '$md',

      color: '$green500',
      cursor: 'pointer',

      marginTop: 8,
    }
  }
})

export const Footer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: 16,

  div: {
    display: 'flex',
    justifyContent: 'space-between'
  }
})

export const BuyButton = styled('button', {
  width: '100%',
  padding: '20px 32px',
  background: '$green500',
  borderRadius: 8,
  border: 0,

  marginTop: 41, //41 + 16 = 57

  fontWeight: 'bold',
  fontSize: '$md',
  color: '$white',

  cursor: 'pointer',

  '&:hover': {
    background: '$green300'
  }
})