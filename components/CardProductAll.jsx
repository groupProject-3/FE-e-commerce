import { useRouter } from "next/router";
import formatRupiah from "../utils/formatRupiah";

export default function CardProductAll({ id, name, image, price, qty, desc }) {
  let priceFormat = formatRupiah(price);
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push(`/product/${id}`)}>
        <div className="card mb-3" style={{ maxWidth: "540px" }}>
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={image}
                className="img-fluid rounded-start mh-100"
                alt="Product"
              />
            </div>
            <div className="col-md-7">
              <div className="card-body">
                <h5 className="card-title">{name}</h5>
                <p className="card-text">{desc}</p>
                <p className="card-text fw-bold">Rp{priceFormat}</p>
                <p className="card-text">{qty} Left</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
