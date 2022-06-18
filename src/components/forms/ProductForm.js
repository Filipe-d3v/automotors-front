import { useState } from 'react';

import Input from './Input';
import FormStyles from './form.module.css';
import Styles from './productForm.module.css';

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

    const setForm = async(endereco) => {
        document.getElementById('cidade').value = endereco.localidade
        document.getElementById('uf').value = endereco.uf

    }

    // const buscarCEP = async() => {
    //     const cep = document.getElementById('cep').value
    //     const url = `http://viacep.com.br/ws/${cep}/json/`

    //     const dados = await fetch(url)
    //     const endereco = await dados.json()
    //     setForm(endereco)
    // }
    
        
    //     let cep = document.getElementById('cep')
    //     if(cep){
    //         cep.addEventListener('focusout', buscarCEP)
    //     } 
        
   
    return (
        <div>
            <form onSubmit={submit} className={FormStyles.form_container}>
                <Input
                    text="Nome do produto"
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    handleOnChange={handleChange}
                    value={product.name || ''}
                />
                <Input
                    text="Descrição"
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    handleOnChange={handleChange}
                    value={product.description || ''}
                />
                <Input
                    text="Valor do droduto R$"
                    type="text"
                    name="price"
                    placeholder="Preço do produto R$"
                    handleOnChange={handleChange}
                    value={product.price || ''}
                />
                <Input
                    id="cep"
                    text="CEP"
                    type="text"
                    name="cep"
                    placeholder="CEP"
                    handleOnChange={handleChange}
                    value={product.cep || ''}
                />
                <Input
                    id="cidade"
                    text="Cidade"
                    type="text"
                    name="city"
                    placeholder="Cidade"
                    handleOnChange={handleChange}
                    value={product.city || ''}
                />
                <Input
                    id="uf"
                    text="UF"
                    type="text"
                    name="uf"
                    placeholder="UF"
                    handleOnChange={handleChange}
                    value={product.uf || ''}
                />
                <Input
                    text="Ano"
                    type="text"
                    name="year"
                    placeholder="Ano do veículo"
                    handleOnChange={handleChange}
                    value={product.year || ''}
                />
                <Input
                    text="Km rodado"
                    type="text"
                    name="kms"
                    placeholder="Quilometros rodados"
                    handleOnChange={handleChange}
                    value={product.kms || ''}
                />
                <Input
                    text="Motor"
                    type="text"
                    name="motor"
                    placeholder="Potência do motor"
                    handleOnChange={handleChange}
                    value={product.motor || ''}
                />
                <Input
                    text="Combustível"
                    type="text"
                    name="fuel"
                    placeholder="Tipo de combustível"
                    handleOnChange={handleChange}
                    value={product.fuel || ''}
                />
                <Input
                    text="Documentação"
                    type="text"
                    name="documents"
                    placeholder="Situação do documento"
                    handleOnChange={handleChange}
                    value={product.documents || ''}
                />
                <Input
                    text="Imagens do produto"
                    type="file"
                    name="images"
                    handleOnChange={onFileChange}
                    multiple={true}
                />
                <input type="submit" value={btnText} />
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