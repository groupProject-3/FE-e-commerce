import { useRouter } from "next/router";
import style from "../styles/CardProduct.module.css";

export default function CardProduct({ id, image, name }) {
  const router = useRouter();
  return (
    <>
      <div onClick={() => router.push(`/product/${id}`)}>
        <div className={`${style.card} my-3`} style={{ width: "18rem" }}>
          <img className="card-img-top shadow" src={image} alt="Product" />
          <div className={style["card-body"]}>
            <h5 className={`${style["card-title"]} mt-3 text-center`}>
              {name}
            </h5>
          </div>
        </div>
      </div>
    </>
  );
}
