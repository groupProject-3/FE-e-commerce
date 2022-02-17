import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";

function Cart() {
  const [data, setData] = useState([
    {
      title: "Lorem Ipsum A",
      price: "1000000",
      count: "1",
      id: "1",
    },
    {
      title: "Lorem Ipsum B",
      price: "2000000",
      count: "2",
      id: "2",
    },
    {
      title: "Lorem Ipsum C",
      price: "4000000",
      count: "3",
      id: "3",
    },
    {
      title: "Lorem Ipsum D",
      price: "5000000",
      count: "4",
      id: "4",
    },
  ]);

  function handleAmount(payload, index, increment = true) {
    payload.count =
      +payload.count + (increment ? 1 : payload.count > 0 ? -1 : -0);
    let sliceData = data.slice();

    sliceData.splice(index, 1, payload);
    // console.log(sliceData);
    setData(sliceData);

    if (payload.count > 1) {
      payload.price = payload.price * payload.count;
    }
  }

  // CSS
  const cartPic = {
    width: "150px",
    height: "150px",
  };
  const cartButton = {
    width: "116px",
    borderRadius: "13px",
    padding: "8px",
  };

  return (
    <div className="container  mt-5 mb-5">
      {data.map((el, i) => (
        <div
          key={i}
          style={{ borderRadius: "30px" }}
          className="row shadow border-dark p-3 align-items-center mt-4"
        >
          <div className="col-2">
            <img
              className=""
              style={cartPic}
              src="https://i5.walmartimages.com/asr/b1267dc0-c950-4777-95ee-f449b3441615.bbeffeb69d736224e5cd9fff566626f3.jpeg"
              alt=""
            />
          </div>

          <div className="col-10">
            <Table borderless>
              <tbody>
                <tr>
                  <td>
                    <h4>Detail Item</h4>
                  </td>
                </tr>

                <tr className="d-flex justify-content-between align-items-center">
                  <td>
                    <h5>{el.title}</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
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
                      {el.count}
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
                    <h5>Rp. {el.price}</h5>
                  </td>
                  <td>
                    <Button style={cartButton} variant="danger">
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
          <h3>Sub Total : Rp. </h3>
        </div>
        <div className="col-2 d-flex justify-content-end">
          <Button style={cartButton} variant="primary">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
