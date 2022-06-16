import {useContext, useState} from 'react';
import Input from '../../forms/Input';

import Styles from '../../forms/form.module.css'
import { Link } from 'react-router-dom';

import { Context } from '../../../context/UserContext';

function Register(){
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        //envia Usuario para o banco
        register(user)
    }
    
    return(
        <section className={Styles.form_container}>
            <h1>Cadastro</h1>
            <form onSubmit={handleSubmit}>
            <Input
                text='Nome'
                type='text'
                name='name'
                placeholder='Digite o nome'
                handleOnChange={handleChange}
                />
            <Input
                text='Telefone'
                type='text'
                name='phone'
                placeholder='Digite o telefone'
                handleOnChange={handleChange}
                />
            <Input
                text='E-mail'
                type='email'
                name='email'
                placeholder='Digite o E-mail'
                handleOnChange={handleChange}
                />
            <Input
                text='Senha'
                type='password'
                name='passwd'
                placeholder='Digite a Senha'
                handleOnChange={handleChange}
                />
            <Input
                text='Confirmação de senha'
                type='password'
                name='confirmpasswd'
                placeholder='Confirme a senha'
                handleOnChange={handleChange}
                />
            <input type='submit' value='Cadastrar' />
        </form>
        <p>
        Já tem conta?<Link to='/login'>Clique aqui</Link>
        </p>
        </section>
    )
}

export default Register