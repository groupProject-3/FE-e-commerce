import { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";

function Cart() {
  const [count, setCount] = useState(1);

  function plus() {
    setCount(count++);
  }
  function minus() {
    if (count > 0) {
      setCount(count--);
    }
  }

  // CSS
  const cartPic = {
    width: "250px",
    height: "250px",
  };
  const cartButton = {
    width: "116px",
    borderRadius: "13px",
    padding: "8px",
  };

  return (
    <div className="container  mt-5">
      <div
        style={{ borderRadius: "30px" }}
        className="row shadow border-dark p-3 align-items-center"
      >
        <div className="col-3">
          <img
            className=""
            style={cartPic}
            src="https://i5.walmartimages.com/asr/b1267dc0-c950-4777-95ee-f449b3441615.bbeffeb69d736224e5cd9fff566626f3.jpeg"
            alt=""
          />
        </div>
        <div className="col-6">
          <Table borderless>
            <tbody>
              <tr>
                <td>
                  <h3>Detail Items</h3>
                </td>
              </tr>

              <tr>
                <td>
                  <h5>Item Name </h5>
                </td>
                <td>
                  <h5>: Lorem Ipsum</h5>
                </td>
              </tr>

              <tr>
                <td>
                  <h5>Item Count </h5>
                </td>
                <td className="d-flex">
                  <h5>
                    :
                    <Button
                      className="mx-3"
                      onClick={() => minus()}
                      variant="primary"
                    >
                      -
                    </Button>
                    {count}
                    <Button
                      className="mx-3"
                      onClick={() => setCount(count++)}
                      variant="primary"
                    >
                      +
                    </Button>
                  </h5>
                </td>
              </tr>

              <tr>
                <td>
                  <h5>Item Detail</h5>
                </td>
                <td>
                  <h5>: Lorem Ipsum</h5>
                </td>
              </tr>
              <tr>
                <td>
                  <h5>Item Price</h5>
                </td>
                <td>
                  <h5>: Rp. 20.000.000</h5>
                </td>
              </tr>
              <tr>
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

      <div
        style={{ borderRadius: "20px" }}
        className="row mt-5 shadow border-dark p-3 align-items-center"
      >
        <div className="col-10">
          <h3>Sub Total : Rp.20.000.000</h3>
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
