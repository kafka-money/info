import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import EthereumLogo from '../../assets/fra.png'

const LOGO_URL = {
  "0x0a65e011819ab16de74c53411a74b607984e5bd6": "https://www.gemini.com/images/currencies/icons/default/usdt.svg",
  "0x749dcc6d976d93fde56735a82b5de9e5f82e93ef": "https://www.gemini.com/images/currencies/icons/default/usdc.svg",
  "0x3cbe826ac1acfd97bbade07fb4640b7d990bccb2": "https://gemini.com/images/currencies/icons/default/dai.svg",
  "0x4c62e68d4d83b253dcfe2c336b4c6ca9bcfbdc25": "https://www.gemini.com/images/currencies/icons/default/btc.svg",
  "0xef15bca14670a35fb0542dba316478a66de090e1": "https://www.gemini.com/images/currencies/icons/default/eth.svg",
}

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '24px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  // hard coded fixes for trust wallet api issues
  if (address?.toLowerCase() === '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb') {
    address = '0x42456d7084eacf4083f1140d3229471bba2949a8'
  }

  if (address?.toLowerCase() === '0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f') {
    address = '0xc011a72400e58ecd99ee497cf89e3775d4bd732f'
  }

  if (address?.toLowerCase() === '0x7874f0fc3f7299f3e0ebbdd7efa8acdde7885880') {
    return (
      <StyledEthereumLogo size={size} {...rest}>
        <img
          src={EthereumLogo}
          style={{
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.075)',
            borderRadius: '24px',
          }}
          alt=""
        />
      </StyledEthereumLogo>
    )
  }

  let path = LOGO_URL[address?.toLowerCase()]

  if (!path) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  return (
    <Inline>
      <Image
        {...rest}
        alt={''}
        src={path}
        size={size}
        onError={(event) => {
          BAD_IMAGES[address] = true
          setError(true)
          event.preventDefault()
        }}
      />
    </Inline>
  )
}
