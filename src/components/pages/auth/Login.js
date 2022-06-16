import {useState, useContext} from 'react'
import Input from '../../forms/Input'

import Styles from '../../forms/form.module.css'

import {Context} from '../../../context/UserContext'
import { Link } from 'react-router-dom'

    function Login(){
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    function handleChange(e){
        setUser({...user, [e.target.name]: e.target.value })
    } 

    function handleSubmit(e){
        e.preventDefault()
        login(user)

        setTimeout(() => {
            window.location.reload(false)
        }, 2000)
    }
    
    return(
        <section className={Styles.form_container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text='E-mail'
                    type='email'
                    name='email'
                    placeholder='Digite o e-mail'
                    handleOnChange={handleChange}
                />
                <Input 
                    text='Senha'
                    type='password'
                    name='passwd'
                    placeholder='Digite a senha'
                    handleOnChange={handleChange}
                />
                <input type='submit' value='Entrar' />
            </form>
            <p>
                Não tem conta? <Link to='/register'>Clique aqui</Link>
            </p>
        </section>
    )
}

export default Login