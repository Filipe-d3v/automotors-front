import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import useFlashMessage from '../../../hooks/useFlashMessage'
import api from '../../../utils/api'
import Styles from './productDetails.module.css'

import { TextareaAutosize, TextField } from '@mui/material'
import Input from '../../forms/Input'


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

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    return (
        <>
            {product.name && (
                <section className={Styles.product_datails_container}>
                    <div className={Styles.product_datails_header}>
                        <h1>{product.name}</h1>
                    </div>
                    <div className={Styles.product_galeria}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
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

                        <div className={Styles.product_details_info}>

                            <h4>Descrição:</h4>
                            <TextareaAutosize
                                disabled='true'
                                minRows='4'
                                handleOnChange={handleChange}
                                value={product.description || ''}
                            />
                            <br />
                            <TextField 
                                size='small'
                                label='Documentação e Km rodado '
                                disabled='true'
                                handleChange={handleChange}
                                value={product.documents + "   " + product.kms}
                            /><br />
                            <TextField
                                size='small'
                                label='Cidade'
                                disabled='true'
                                handleChange={handleChange}
                                value={product.city + "  " + product.uf}
                            /><br />
                            <TextField
                                size='small'
                                label='Motor'
                                disabled='true' 
                                handleChange={handleChange}
                                value={product.motor + "  " + product.fuel}
                            /> <br />
                            <TextField
                                size='small'
                                label='Vrlor R$'
                                disabled='true' 
                                handleChange={handleChange}
                                value={product.price}
                            /><br />
                        </div>

                    </div>
                    <div className={Styles.product_info}>
                    </div>

                </section>
            )}
        </>
    )
}

export default ProductDetails