import {useContext, useState} from 'react';

import Styles from './register.module.css'
import { Link } from 'react-router-dom';

import { Context } from '../../../context/UserContext';
import { Button, TextField } from '@mui/material';

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
            <h1>Sign In</h1>
            <TextField
                size='small'
                label='Nome'
                type='text'
                name='name'
                placeholder='Digite o nome'
                onChange={handleChange}
                /><br />
            <TextField
                size='small'
                label='Telefone'
                type='text'
                name='phone'
                placeholder='Digite o telefone'
                onChange={handleChange}
                /><br />
            <TextField
                size='small'
                label='E-mail'
                type='email'
                name='email'
                placeholder='Digite o E-mail'
                onChange={handleChange}
                /><br />
            <TextField
                size='small'
                label='Senha'
                type='password'
                name='passwd'
                placeholder='Digite a Senha'
                onChange={handleChange}
                /><br />
            <TextField
                size='small'
                label='Confirmação de senha'
                type='password'
                name='confirmpasswd'
                placeholder='Confirme a senha'
                onChange={handleChange}
                /><br />
            <Button onClick={handleSubmit} variant='contained' color='success' type='submit'>cadastrar</Button>
        <p>
        Já tem conta?<Link to='/login'>Clique aqui</Link>
        </p>
        </section>
    )
}

export default Register