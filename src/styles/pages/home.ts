import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656,
})

export const Product = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  
  position: 'relative',
  overflow: 'hidden',
  minWidth: 540,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
    cursor: 'pointer',
    '@bp1': {
      width: 300,
      height: 300
    },
  },

  '@bp1': {
    height: 400
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    padding: '2rem',

    borderRadius: 6,

    display: 'flex',
    justifyContent: 'space-between',

    backgroundColor: 'rgba(0, 0, 0, 0.6)',

    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    div: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'space-between',

      strong: {
        fontSize: '$lg',
        color: '$gray100'
      },
  
      span: {
        fontSize: '$xl',
        fontWeight: 'bold',
        color: '$green300',
        '@bp1': {
          marginTop: '1rem'
        },
      }
    },
    '@bp1': {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      padding: '1rem',
      opacity: 1,
      transform: 'none',
      flexDirection: 'column',
    },
  },

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1,
      cursor: 'default',
    }
  }
})

export const AddToCartButton = styled('button', {
  display: 'flex',
  width: 56,
  height: 56,
  padding: 12,
  borderRadius: 6,
  background: '$green500',

  alignItems: 'center',
  justifyContent: 'center',
  border: 0,

  cursor: 'pointer',

  '@bp1': {
    position: 'absolute',
    display: 'flex',
    width: 30,
    height: 30,
    padding: 6,
    bottom: '1rem',
    right: '1rem',
  },
})