import { LastGameTable, HeroMobileLinksTable, Carousel } from "../components";


const Logo = () => {
  return (
    <img
      src="/assets/images/rubber_puckie_logo.png"
      style={{ width: "30px", height: "30px" }}
    />
  )
}

const Header = () => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <h1 style={{ margin: "0px" }}> Rubber Puckie Hockey </h1>
    </div>
  )
}


export default function Hero() {
  const smallMobile = window.screen.width < 375
  const displayLinks = window.screen.width < 450


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end"
        }}
      >
        {!smallMobile && <Logo />}
        <Header />
        {!smallMobile && <Logo />}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderBottom: "solid goldenrod 1px",
          margin: "16px 0px"
        }}
      >
        <Carousel />
        {/* <img
          src="/assets/images/championship_winter_2024.jpeg"
          alt="Team photo"
          style={{ width: "90vw", maxWidth: "900px", margin: "16px 0px 32px 0px" }}
        /> */}

      </div>


      {displayLinks &&
        <div style={{ borderBottom: "solid goldenrod 1px", margin: "16px 0px" }}>
          <HeroMobileLinksTable />
        </div>
      }

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <LastGameTable />
      </div>


    </>)
}