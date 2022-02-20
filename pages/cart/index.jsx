import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../../styles/Cart.module.css";

function Cart() {
  const router = useRouter();
  const [resetPrice, setresetPrice] = useState(0);
  const [totalprice, setTotalprice] = useState(0);
  const [listCart, setListCart] = useState([]);

  // get list cart
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://18.140.1.124:8081/cart/me/status/cart", config)
      .then(({ data }) => {
        setListCart(data.data);
      })
      .catch((err) => {
        console.log(err, "error bang");
      });
  }, []);

  // set total price
  useEffect(() => {
    {
      if (listCart) {
        listCart.map((el, i) => setTotalprice((resetPrice += +el.pricetotal)));
      }
    }
  }, [listCart]);

  // handle counter button
  function handleAmount(payload, index, increment = true) {
    // console.log(payload);
    if (increment) {
      payload.price = +payload.price + +payload.price / +payload.qty;
      // setTimeout(() => {
      //   location.reload(true);
      // }, 1000);
    } else if (!increment && payload.qty > 1) {
      payload.price = +payload.price - +payload.price / +payload.qty;

      setTimeout(() => {
        location.reload(true);
      }, 1000);
    }

    payload.qty = +payload.qty + (increment ? 1 : payload.qty > 1 ? -1 : -0);
    let sliceData = listCart.slice();
    // console.log(payload);
    sliceData.splice(index, 1, payload);
    // console.log(sliceData);
    setListCart(sliceData);

    if (increment) {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const inc = {
        qty: payload.qty,
      };

      axios
        .put(
          `http://18.140.1.124:8081/cart/me/${payload.product_id}`,
          inc,
          config
        )
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const dec = {
        qty: payload.qty,
      };
      axios
        .put(
          `http://18.140.1.124:8081/cart/me/${payload.product_id}`,
          dec,
          config
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // handle checkbox
  function handleCheckbox(action, payload) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(action.target.checked);
    // console.log(payload.product_id);
    const checktrue = {
      status: "order",
    };
    const checkfalse = {
      status: "cart",
    };
    if (action.target.checked === true) {
      axios
        .put(
          `http://18.140.1.124:8081/cart/me/${payload.product_id}`,
          checktrue,
          config
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .put(
          `http://18.140.1.124:8081/cart/me/${payload.product_id}`,
          checkfalse,
          config
        )
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // handle delete
  function handleDelete(payload) {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .delete(`http://18.140.1.124:8081/cart/me/${payload.product_id}`, config)
      .then((data) => {
        setTimeout(() => {
          location.reload(true);
        }, 1000);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // handle checkout
  function handleCheckout() {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const payment = {
      payment_method_id: 1,
    };

    axios
      .post("http://18.140.1.124:8081/order/me", payment, config)
      .then((data) => {
        router.push("/");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={`container  mt-5 mb-5 ${styles.mainContainer}`}>
      {listCart.map((el, i) => (
        <div
          key={i}
          style={{ borderRadius: "30px" }}
          className={`row shadow border-dark p-3 align-items-center mt-4 ${styles.mainRow}`}
        >
          <div className={`col-2 ${styles.cardStatus}`}>
            <img className={styles.cartPic} src={el.image} alt="" />
          </div>

          <div className={`col-10 ${styles.cardStatus}`}>
            <Table borderless>
              <tbody>
                <tr>
                  <td>
                    <h4>Detail Item</h4>
                  </td>
                </tr>

                <tr className="d-flex justify-content-between align-items-center">
                  <td>
                    <h5>{el.name}</h5>
                  </td>
                  <td>
                    <Form>
                      <h4>
                        <Form.Check
                          type="checkbox"
                          onChange={(e) => handleCheckbox(e, el)}
                        />
                      </h4>
                    </Form>
                  </td>
                  <td>
                    <h6>
                      <Button
                        className="mx-3"
                        onClick={() => {
                          handleAmount(el, i, false);
                        }}
                        variant="light"
                      >
                        -
                      </Button>

                      {el.qty}

                      <Button
                        className="mx-3"
                        onClick={() => {
                          handleAmount(el, i, true);
                        }}
                        variant="light"
                      >
                        +
                      </Button>
                    </h6>
                  </td>
                  <td>
                    <h5>Rp. {el.pricetotal}</h5>
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(el)}
                      className={styles.cartButton}
                      variant="danger"
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      ))}

      <div
        style={{ borderRadius: "20px" }}
        className="row mt-5 shadow border-dark p-3 align-items-center"
      >
        <div className="col-10">
          <h3>Sub Total : Rp. {totalprice} </h3>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <Button
            className={styles.cartButton}
            variant="primary"
            onClick={() => handleCheckout()}
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
