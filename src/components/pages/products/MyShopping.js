import { useEffect, useState } from 'react'
import api from '../../../utils/api'
import RoundedImage from '../../layouts/RoundedImage'
import Styles from './dashboard.module.css'

function MyShopping() {
    const [products, setProduct] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get('/products/myshopping', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setProduct(response.data.products)
        })
    }, [token])
    return (
        <section>
            <div className={Styles.productlist_header}>
                <h1>Minas Compras</h1>
            </div>
            <div className={Styles.productlist_container}>
                {products.length > 0 && products.map((product) => (
                    <div key={product._id} className={Styles.productlist_row}>
                        <RoundedImage
                            src={`${process.env.REACT_APP_API}/images/products/${product.images[0]}`}
                            alt={product.name}
                            width='px75'
                        />
                        <br />
                        <span className="bold">{product.name}</span><br />
                        <span className="bold">{product.price}</span>
                        <div>
                            <p>
                                <span className='bold'>Ligue para:</span>{product.user.phone}
                            </p>
                            <p>
                                <span className='bold'>Vendedor:</span>{product.user.name}
                            </p>
                        </div>
                        <div className={Styles.actions}>
                            {product.available ? (<>
                                <p>Negociação em andamento</p>
                            </>) : <p>Parabéns por efetuar uma venda</p>}
                        </div>
                    </div>
                ))}
                {products.length === 0 && <p>Nenhum registo de compras</p>}
            </div>
        </section>
    )
}

export default MyShopping