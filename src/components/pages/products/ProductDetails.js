import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import Styles from './productDetails.module.css'


function ProductDetails() {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/products/${id}`).then((response) => {
            setProduct(response.data.product)
        })
    }, [id])

    async function reserve() {
        let msgType = 'success'

        const data = await api.patch(`products/reserve/${product._id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`
        })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                msgType = 'error'
                return err.response.data
            })

        setFlashMessage(data.message, msgType)
    }

    //Galeria visualização de imagens

    let imagens = document.querySelectorAll('.small_img')
    let modalImg = document.getElementById('modal_img')
    let srcval = ""

    for (let i = 0; i < imagens.length; i++) {
        imagens[i].addEventListener('click', function () {

            srcval = imagens[i].getAttribute('src')
            modalImg.setAttribute('src', srcval)
        })
    }

    return (
        <>
            {product.name && (
                <section className={Styles.product_datails_container}>
                    <div className={Styles.product_datails_header}>
                        <h1>{product.name}</h1>
                        <p style={{ color: '#000' }}>Se interessou? Entre em contato com {product.user.name}</p>
                    </div>
                    <div className={Styles.product_galeria}>
                        <div className={Styles.product_images}>
                            {product.images.map((image, index) => (
                                <img className='small_img'
                                    src={`${process.env.REACT_APP_API}/images/products/${image}`}
                                    alt={product.name}
                                    key={index}
                                />
                            ))}
                        </div>

                        <div className={Styles.modal}>
                            <img id='modal_img' src={`${process.env.REACT_APP_API}/images/products/${product.images[0]}`} alt={product.name} />
                        </div>

                    </div>
                    <div className={Styles.product_info}>
                        <p>
                            <span className='bold'>R$:</span> {product.price}
                        </p>
                        {token ?
                            <button onClick={reserve}>Reservar</button> :
                            <p>É necessário <Link to='/register'> criar uma conta </Link> para contatar!</p>
                        }
                    </div>

                </section>
            )}
        </>
    )
}

export default ProductDetails