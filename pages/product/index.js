import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { Zoom } from "react-awesome-reveal";
import CardProductAll from "../../components/CardProductAll";

export default function AllProduct(props) {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("../user/login");
    }
  }, []);
  const products = props.data.data;
  const router = useRouter();
  return (
    <>
      <Container>
        <div className="my-4 d-flex flex-wrap justify-content-between">
          <h1>All Product</h1>
          <button
            className="btn btn-primary rounded-pill"
            onClick={() => router.push("/product/create")}
          >
            Add Your Product
          </button>
        </div>
        <div className="d-flex flex-wrap justify-content-around">
          {products.map((product, i) => (
            <Zoom triggerOnce>
              <CardProductAll
                key={i}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                qty={product.qty}
                desc={product.description}
              />
            </Zoom>
          ))}
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
