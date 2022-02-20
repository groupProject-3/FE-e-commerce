import axios from "axios";
import { useRouter } from "next/router";
import { Carousel, Container } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import CardProduct from "../../components/CardProduct";
import style from "../../styles/Home.module.css";
import Navbar from '../../components/Navbar'

export default function Home(props) {
  const products = props.data.data.slice(0, 6);
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/carousel1.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/carousel2.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="./images/carousel3.jpg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <Container className="my-5">
        <h1>Our Product</h1>
        <div className="d-flex flex-wrap justify-content-around">
          {products.map((product, i) => (
            <Zoom triggerOnce>
              <CardProduct
                key={i}
                id={product.id}
                image={product.image}
                name={product.name}
              />
            </Zoom>
          ))}
        </div>
        <div className="text-center mt-5">
          <button
            onClick={() => router.push(`/product`)}
            className={`btn btn-dark rounded-pill px-4 py-2 ${style["btn-dark"]}`}
          >
            See All Product
          </button>
        </div>
      </Container>
    </>
  );
}

export async function getStaticProps() {
  const result = await axios.get("http://18.140.1.124:8081/product/all");
  const data = await result.data;

  return {
    props: {
      data,
    },
  };
}
