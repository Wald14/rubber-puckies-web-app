import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

export default function UncontrolledExample() {
  return (

    <Carousel>
      <Carousel.Item>
        <img src="/assets/images/championship_fall_2023.jpeg" style={{width: "100vw"}}/>
        <Carousel.Caption>
          <h3>Fall 2023 Champions</h3>
        </Carousel.Caption>
      </Carousel.Item>
      {/* <Carousel.Item>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
    
  );
}