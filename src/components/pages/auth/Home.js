import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import api from "../../../utils/api"

import Styles from './home.module.css'

import { FaCalendar, FaFileAlt } from 'react-icons/fa'
import Painel from "../../layouts/Painel"

function Home() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('/products').then((response) => {
            setProducts(response.data.products)
        })
    }, [])

    return (
        <>
        <section>
            <Painel />
        </section>
            <section>
                <div className={Styles.product_container}>
                    {products.length > 0 && (
                        products.map((product) => (
                            <div className={Styles.product_card} key={product._id}>
                                <div
                                    style={{
                                        backgroundImage:
                                            `url(${process.env.REACT_APP_API}/images/products/${product.images[0]})`,
                                    }}
                                    className={Styles.product_card_image}>
                                </div>
                                <div className={Styles.product_card_info}>
                                    <h3>{product.name}</h3>
                                    <p><FaFileAlt /> {product.documents}</p>
                                    <p><FaCalendar /> {product.year}</p>
                                    <p>R$: {product.price}</p>
                                </div>
                                {product.available ? (<Link to={`product/${product._id}`}>Detalhes</Link>) :
                                    (<p className={Styles.buyed_text}>Vendido</p>)}
                            </div>
                        ))
                    )}
                    {products === 0 && (
                        <p>sem produtos cadastrados</p>
                    )}
                </div>
            </section>
        </>
    )
}

export default Home