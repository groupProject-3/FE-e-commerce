// import { useRouter } from 'next/router'
import React from 'react'
import Image from 'next/image'
import gambarLaptop from '../../public/laptop.jpg'
import styles from '../../styles/Detail.module.css'

export default function productDetail() {
    // const router = useRouter()
    // const {slug} = router.query
    // const product = data.products.find(a => a.slug === slug)
    // if (!product){
    //     return <div>Product not found</div>
    // }
    return (
        // Navbar
        <div className={styles.content}>
            <div className={styles.leftContent}>
                <Image 
                    src={gambarLaptop}
                    alt=""
                    width={700}
                    height={500}
                />         
             </div>

            <div className={styles.rightContent}>
                <div className="title-content"> Laptop Mac M1</div>
                <div className="description-content">
                    <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                </div>
                <div className="price-content">Rp 20.000.000</div>

            
            </div> 
        </div>
       

    )
}
