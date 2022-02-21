import axios from "axios";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useRouter } from "next/router";

export default function create() {
  const router = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("../user/login");
    }
  }, []);
  const [productName, setProductName] = useState("");
  const [productTypeId, setProductTypeId] = useState(0);
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  const [productType, setproductType] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get("http://18.140.1.124:8081/product/type", config)
      .then(({ data }) => {
        setproductType(data.data);
      })
      .catch((err) => {
        console.log(err, "error bang");
      });
  }, []);

  function handleAddProduct() {
    const body = {
      name: productName,
      image: imageUrl,
      product_type_id: productTypeId,
      price: price,
      qty: qty,
      description: desc,
    };
  }

  return (
    <>
      <Container className="w-75 my-5">
        <div className="my-3">
          <h1 className="text-center">Add Product</h1>
          <hr />
        </div>
        <form>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input
              type="text"
              className="form-control"
              id="inputProduct"
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Product Type</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => {
                setProductTypeId(e.target.value);
              }}
            >
              {productType.map((product, i) => (
                <option key={i} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Price</label>
              <input
                type="number"
                className="form-control"
                id="inputPrice"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 col-md-6">
              <label className="form-label fw-bold">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="inputQty"
                onChange={(e) => {
                  setQty(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="inputProduct"
              onChange={(e) => {
                setImageUrl(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              name="description"
              className="form-control"
              id="inputDesc"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddProduct}
          >
            Submit
          </button>
        </form>
      </Container>
    </>
  );
}
