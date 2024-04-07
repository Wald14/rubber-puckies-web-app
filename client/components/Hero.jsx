// Components
import { LastGameTable, HeroMobileLinksTable, Carousel, NextGameTable } from "../components";

// CSS
import './hero.css'

// Sub Components
const Logo = () => {
  return (
    <img
      src="/assets/images/rubber_puckie_logo.png"
      className="hero-logo"
    />
  )
}
const Header = () => {
  return (
    <div className="hero-center-container">
      <h1 className="hero-zero-margin"> Rubber Puckie Hockey </h1>
    </div>
  )
}


export default function Hero() {
  // Detect screen size
  const smallMobile = window.screen.width < 375
  const displayLinks = window.screen.width < 450

  return (
    <>
      <div className="hero-center-container" >
        {!smallMobile && <Logo />}
        <Header />
        {!smallMobile && <Logo />}
      </div>

      <div className="hero-carousel-container">
        <Carousel />
      </div>


      {displayLinks &&
        <div className="hero-break-line">
          <HeroMobileLinksTable />
        </div>
      }

      <div className="hero-center-container">
        <NextGameTable />
        <LastGameTable />
      </div>


    </>)
}