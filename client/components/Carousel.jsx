import Carousel from 'react-bootstrap/Carousel';
import './carousel.css'
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

export default function UncontrolledExample() {
  return (

    <Carousel>
      <Carousel.Item>
        <img src="/assets/images/championship_fall_2023.jpeg" className='carousel-img'/>
        <Carousel.Caption>
          <h3 className="carousel-h2">Fall 2023 Champions</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/assets/images/05_13_2023_rp_scrimmage_vs_mn_sentinels.jpg" className='carousel-img'/>
        <Carousel.Caption>
          <h3 className="carousel-h2">May 2023 - Scrimmage vs Minnesota Sentinels</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/assets/images/03_26_2023_winter_champions.JPEG" className='carousel-img'/>
        <Carousel.Caption>
          <h3 className="carousel-h2">Winter 2023 Champions</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src="/assets/images/03_23_2022_rp_scrimmage_vs_mn_sentinels.JPG" className='carousel-img'/>
        <Carousel.Caption>
          <h3 className="carousel-h2">March 2022 - Scrimmage vs Minnesota Sentinels</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
}