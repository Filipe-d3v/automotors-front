import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

import api from '../../../utils/api'

import SquareImage from '../../layouts/SquareImage'
import Styles from './dashboard.module.css'

function MyProducts() {
    const [products, setProducts] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/products/myproducts', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
            .then((response) => {
                setProducts(response.data.products)
            })
    }, [token])

    async function removeProduct(id) {
        let msgType = 'success'

        const data = await api.delete(`/products/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            const updatedProducts = products.filter((product) => product._id !== id)
            setProducts(updatedProducts)
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })

        setFlashMessage(data.message, msgType)
    }

    async function finishSold(id) {
        let msgType = 'success'

        const data = await api.patch(`/products/sold/${id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
    }

    return (
        <section>
            <div className={Styles.productlist_header}>
                
                <Link to="/product/add">Cadastrar Produto</Link>
            </div>
            <div className={Styles.productlist_container}>
                {products.length > 0 &&
                    products.map((product) => (
                        <div className={Styles.productlist_row} key={product._id}>
                            <SquareImage
                                src={`${process.env.REACT_APP_API}/images/products/${product.images[0]}`}
                                alt={product.name}
                                width='px100'
                            />
                            <div className={Styles.product_info}>
                                <span>{product.name}</span>
                                <br />
                                <p>Ano: {product.year}</p>
                                <p>R$: {product.price}</p>
                                <p>Km: {product.kms}</p>
                                <p>Doc: {product.documents}</p>
                            </div>
                            <div className={Styles.actions}>
                                {product.available ? (<>
                                    {product.buyer &&
                                        <button className={Styles.finish_btn} onClick={() => {
                                            finishSold(product._id)
                                        }}>
                                            Finalizar venda
                                        </button>}
                                    <Link to={`/product/edit/${product._id}`}>Editar</Link>
                                    <button onClick={() => { removeProduct(product._id) }}>Remover</button>
                                </>) : <p>Disponível</p>}
                            </div>
                        </div>
                    ))}
                {products.length === 0 && <p>Nenhum Produto cadastrado</p>}
            </div>
        </section>
    )
}

export default MyProducts