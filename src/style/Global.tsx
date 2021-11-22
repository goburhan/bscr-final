import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@macist-m/robinia-uikit'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    background-color: #1C1E22;

    img {
      height: auto;
      max-width: 100%;
    }
  }
  .rbs-bg {
    background: rgba(255, 255, 255, 0.45);
    backdrop-filter: blur(45px);
  }
  .rbs-card {
    background-image: url('/images/stakeearn.svg');
    background-repeat: no-repeat;
    background-size: cover;
    width:auto;

    padding: 25px;
    border-radius: 30px;
    box-shadow: 0px -5px 25px  rgba(50, 53, 61);
    margin-left: 6px;
    margin-right: 6px;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin: 0 auto;
    }
    ${({ theme }) => theme.mediaQueries.lg} {
      margin: 0 auto;
    }
  }
  .earn-bg {
    background-image: url('/images/stake-earn-apr.svg');
    background-size:auto;
    background-repeat: no-repeat;

    height : 120px;
    text-align : center;
    margin-left: 6px;
    margin-right: 6px;
    margin-top:6px;
    
  }
  .topfarmcardbg {
    background-image: url('/images/topfarmcardbg.svg');
    background-size:cover;
    background-repeat: no-repeat;
    height:288px;
    width:100%;
    margin-left: -6px;
    margin-top:6px;
    
  }

  .slick-list> div {
    margin-left:0;
  }
`

export default GlobalStyle
