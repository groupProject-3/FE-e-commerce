import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect, useContext } from "react";
import styles from '../../styles/Detail.module.css'
import { Button, Container } from 'react-bootstrap'
import {FaShoppingCart} from 'react-icons/fa'
import NextLink from 'next/link'
import Link from 'next/link';
import axios from 'axios';
import Navbar from '../../components/Navbar'
import { Store } from './store';



export default function Detail() {
    // const [state, dispatch] = useContext(Store)
    const [token, setToken] = useState("")
    const [product, setProduct] = useState([])
    const [sameProduct, setSameProduct]= useState([])
    const [variant, setVariant] = useState('danger');
    const [status, setStatus] = useState(false)
    const [msg, setMsg]=useState('')
    const [idProduct, setIdProduct]= useState(0)

    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }
        axios
        .get(`http://18.140.1.124:8081/product/me/${id}`,config)
        .then (({data}) => {
            // console.log(data.data.id);
            setProduct(data.data)
            
            setIdProduct(data.data.id)
        })
        .catch((err) =>{
            console.log(err, "error");
        })
    }, [token])

    function addToCartHandler(){
        const body={
            qty: 1,
            product_id: idProduct,
        }
        const token = localStorage.getItem("token")
        const config = {
            headers: {Authorization: `Bearer ${token}`},
        }

        axios
        .post('http://18.140.1.124:8081/cart/me', body, config)
        .then (({data})=>{
            console.log(data);
            setStatus(true)
            setMsg(data.message)
            setVariant('success')    
        })
        .catch((err)=>{
            if(product.qty<0){
                setMsg(data.message)
                setVariant('danger')
            }
        })

    }
   
    return (
        <>
        <Navbar />
        <Container>
        <NextLink href="/home" passHref>
           <Link>
            Back to product
           </Link> 
        </NextLink>
        <div className={styles.wrapper}>
            <div className={styles.content}>

                {/* left content */}
                <div className={styles.productImg}>
                    <div className={styles.imgDisplay}>
                        <div className={styles.imgShowcase}>
                            <img 
                                src={product.image}
                                alt=""
                                className={styles.img2}
                            />
                        </div>
                    </div>
                </div>

                {/* right content */}
                <div className={styles.detailProduct}>
                    <h2 className={styles.produkTitle}>{product.name}</h2>

                    <div className={styles.productPrice}>
                        <p>Price : <span>Rp {product.price} ,-</span></p>
                    </div>

                    <div className={styles.productDetail}>
                        <h2>about this item :</h2>
                        <p>
                            {product.description}
                        </p>
                    </div>

                    <div className={styles.addCart}>
                        <h5>{product.qty>0? 'In Stock' : 'Out of Stock'}</h5>  
                        <Button type="button" className={styles.btnAdd}
                            onClick={addToCartHandler}
                        >
                            Add to Cart <FaShoppingCart />
                        </Button>
                    </div>
                </div>                  
            </div>                   
        </div>
        
        </Container>

        </>

    )
}
