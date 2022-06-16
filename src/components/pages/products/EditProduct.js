import api from "../../../utils/api"

import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"

import Styles from './addProduct.module.css'
import ProductForm from "../../forms/ProductForm"

import useFlashMessage from "../../../hooks/useFlashMessage"

function EditProduct() {
    const [product, setProduct] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')
    const { id } = useParams()
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get(`/products/${id}`, {
            Authorization: `Bearer ${JSON.parse(token)}`,
        })
        .then((response) => {
            setProduct(response.data.product)
        })

    }, [token, id])

    async function updateProduct(product) {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(product).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < product[key].length; i++){
                    formData.append('images', product[key][i])
                }
            } else {
                formData.append(key, product[key])
            }
        })
        const data = await api.patch(`products/${product._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
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
    
    return (
        <section>
            <div className={Styles.addproduct_header}>
                <h1 >
                    {product.name}
                </h1>
            </div>
            {product.name && 
                <ProductForm handleSubmit={updateProduct} btnText="Salvar" producData={product}/>
            }
        </section>
    )
}

export default EditProduct