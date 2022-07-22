import { useState, useContext } from 'react'

import Styles from './login.module.css'

import { Context } from '../../../context/UserContext'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@mui/material'
import { FaUnlockAlt } from 'react-icons/fa'

function Login() {
    const [user, setUser] = useState({})
    const { login } = useContext(Context)

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login(user)

        setTimeout(() => {
            window.location.reload(false)
        }, 2000)
    }

    return (
        <section className={Styles.container}>
            <h1><FaUnlockAlt /> Login</h1>
            
                <TextField
                    size='small'
                    label='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite o e-mail'
                    onChange={handleChange}
                /><br />
                <br />
                <TextField
                    size='small'
                    label='Senha'
                    type='password'
                    name='passwd'
                    placeholder='Digite a senha'
                    onChange={handleChange}
                /><br />
                <br />
                <Button onClick={handleSubmit} type='submit' variant='contained' color='success'>entrar</Button>

            <p>
                Não tem conta? <Link to='/register'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Login