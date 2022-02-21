import { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Form, Button, Spinner, Alert, Toast } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../components/Navbar";
import ovoLogo from "../../public/images/OVO.png";
import Image from "next/image";
import styles from "../../styles/Payment.module.css";
import { useRouter } from "next/router";
import axios from "axios";

const formLogin = {
  height: "60px",
  borderRadius: "10px",
  width: "30rem",
  backgroundColor: "#ffffff00",
};

export default function Payment() {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("user/login");
    }
  }, []);
  const [token, setToken] = useState("");
  const [payment, setPayment] = useState([]);
  const [numberOvo, setNumberOvo] = useState("");
  const [addressUser, setAddressUser] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("http://18.140.1.124:8081/order/me", config)
      .then(({ data }) => {
        // console.log(data.data.id);
        // setPayment(data.data);
        setPayment(data.data.orderDetails[0], "masuk");
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);
  function checkToPay() {
    const body = {
      address: addressUser,
      phonenumber: 1,
      status: "payed",
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .put("http://18.140.1.124:8081/order/me", body, config)
      .then(({ data }) => {
        console.log(data);
        setStatus(true);
        setMsg(data.message);
        setVariant("success");
      })
      .catch((err) => {
        if (payment.qty < 0) {
          setMsg(data.message);
          setVariant("danger");
        }
      });
  }

  return (
    <div>
      <Container>
        <div className={styles.content}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <h1>Billing details</h1>

            <h6>Address</h6>
            <Form.Control
              style={formLogin}
              className="shadow-sm"
              type="text"
              onChange={(e) => {
                setAddressUser(e.target.value);
              }}
            />
            <h4>Payment with</h4>
            <div className={styles.squareOvo}>
              <Image src={ovoLogo} alt="" width={500} height={200} />

              <Form.Group className="mb-3" controlId="formBasicName">
                <h6>Phone number</h6>
                <Form.Control
                  style={formLogin}
                  className="shadow-sm"
                  type="text"
                  onChange={(e) => {
                    setNumberOvo(e.target.value);
                  }}
                />
              </Form.Group>
            </div>
          </Form.Group>

          <div className={styles.detailOrder}>
            <div className={styles.boxOrder}>
              <h3>ORDER SUMMARY</h3>

              <h4>{payment.name}</h4>
              <p>{payment.qty}</p>
              <h5>{payment.pricetotal}</h5>
              <Button onClick={checkToPay}>PURCHASE NOW</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
