import { useState } from 'react';

import FormStyles from './form.module.css';
import Styles from './productForm.module.css';

import { Button, TextareaAutosize, TextField } from '@mui/material'
import {IoCamera} from 'react-icons/io5'

function ProductForm({ handleSubmit, producData, btnText }) {
    const [product, setProduct] = useState(producData || {})
    const [preview, setPreview] = useState([])

    function onFileChange(e) {
        setPreview(Array.from(e.target.files))
        setProduct({ ...product, images: [...e.target.files] })
    }

    function handleChange(e) {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    function submit(e) {
        e.preventDefault()
        handleSubmit(product)
    }


    return (
        <div className={Styles.forms}>
            <form onSubmit={submit} className={FormStyles.form_container}>
                <TextField
                    size='small'
                    label="Nome do produto"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    onChange={handleChange}
                    value={product.name || ''}
                /><br />
                <TextareaAutosize
                    minRows={4}
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    onChange={handleChange}
                    value={product.description || ''}
                /><br />
                <TextField
                    size='small'
                    label="Valor do droduto R$"
                    type="text"
                    name="price"
                    placeholder="Preço do produto R$"
                    onChange={handleChange}
                    value={product.price || ''}
                /><br />
                <TextField
                    size='small'
                    id="cep"
                    label="CEP"
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    onChange={handleChange}
                    value={product.cep || ''}
                /><br />
                <TextField
                    size='small'
                    id="cidade"
                    label="Cidade"
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    onChange={handleChange}
                    value={product.city || ''}
                /><br />
                <TextField
                    size='small'
                    id="uf"
                    label="UF"
                    type="text"
                    name="uf"
                    placeholder="UF"
                    onChange={handleChange}
                    value={product.uf || ''}
                /><br />
                <TextField
                    size='small'
                    label="Ano"
                    type="text"
                    name="year"
                    placeholder="Ano do veículo"
                    onChange={handleChange}
                    value={product.year || ''}
                /><br />
                <TextField
                    size='small'
                    label="Km rodado"
                    type="text"
                    name="kms"
                    placeholder="Quilometros rodados"
                    onChange={handleChange}
                    value={product.kms || ''}
                /><br />
                <TextField
                    size='small'
                    label="Motor"
                    type="text"
                    name="motor"
                    placeholder="Potência do motor"
                    onChange={handleChange}
                    value={product.motor || ''}
                /><br />
                <TextField
                    size='small'
                    label="Combustível"
                    type="text"
                    name="fuel"
                    placeholder="Tipo de combustível"
                    onChange={handleChange}
                    value={product.fuel || ''}
                /><br />
                <TextField
                    size='small'
                    label="Documentação"
                    type="text"
                    name="documents"
                    placeholder="Situação do documento"
                    onChange={handleChange}
                    value={product.documents || ''}
                /><br />
                <div>
                    <label htmlFor='files'> <IoCamera /> Escolher Fotos</label>
                    <input
                    id='files'
                    size='small'
                    label="Imagens do veículo"
                    type="file"
                    name="images"
                    onChange={onFileChange}
                    multiple={true}
                />
                </div>
                <br />
                <Button type="submit" variant='contained' color='success'> {btnText} </Button>
            </form>
            <div className={Styles.images}>
                {preview.length > 0 ?
                    preview.map((image, index) => (
                        <img
                            src={URL.createObjectURL(image)}
                            alt={product.name}
                            key={`${product.name}+${index}`}
                        />
                    )) :
                    product.images && product.images.map((image, index) => (
                        <img
                            src={`${process.env.REACT_APP_API}/images/products/${image}`}
                            alt={product.name}
                            key={`${product.name}+${index}`}
                        />
                    ))}
            </div>
        </div>
    )
}

export default ProductForm