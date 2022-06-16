import Styles from './addProduct.module.css';
import ProductForm from '../../forms/ProductForm';

import api from '../../../utils/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage';

function AddProduct() {
    const [token] = useState(localStorage.getItem('token') || '')
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    async function registerProduct(product) {
        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(product).forEach((key) => {
            if (key === 'images') {
                for (let i = 0; i < product[key].length; i++) {
                    formData.append('images', product[key][i])
                }
            } else {
                formData.append(key, product[key])
            }
        })

        const data = await api.post('products/create', formData, {
            Authorization: `Bearer ${JSON.parse(token)}`,
            'Content-Type': 'multipart/form-data',
        })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                msgType = 'error'
                return err.response.data
            })

            setFlashMessage(data.message, msgType)

        if (msgType !== 'error') {
            navigate('/product/myproducts')
        }
    }

    return (
        <section className={Styles.addproduct_header}>
            <div>
                <h1>CADASTRO</h1>
                <ProductForm handleSubmit={registerProduct} btnText='Cadastrar' />
            </div>
        </section>
    )
}

export default AddProduct