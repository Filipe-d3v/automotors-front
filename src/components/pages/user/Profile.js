import Styles from './profile.module.css'
import FormStyles from '../../forms/form.module.css'
import Input from '../../forms/Input'

import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import useFlashMessage from '../../../hooks/useFlashMessage'
import RoundedImage from '../../layouts/RoundedImage'
import { Link } from 'react-router-dom'

function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])

    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }

    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'
        const formaData = new FormData()

        await Object.keys(user).forEach((key) => {
            formaData.append(key, user[key])
        })

        const data = await api.patch(`/users/edit/${user._id}`, formaData, {
            headers: {
                Authorizatio: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'muitipart/form-data'
            }
        }).then((response) => {
            return response.data
        }).catch((err) => {
            msgType = 'error'
            return err.response.data
        })
        setFlashMessage(data.message, msgType)
    }

    return (
        <section className={Styles.profile}>
            <div className={Styles.profile_info}>
                <div className={Styles.profile_container}>
                    {(user.image || preview) && (
                        <RoundedImage src={preview ? URL.createObjectURL(preview) :
                            `${process.env.REACT_APP_API}/images/users/${user.image}`} alt={user.name} />
                    )}
                    <i>
                        <Input
                            id='btnImg'
                            type='file'
                            name='image'
                            handleOnChange={onFileChange}
                        />
                    </i>
                    <h3>{user.name}</h3>
                    <h4>{user.phone}</h4>
                    
            <Link to='/myshopping'>MINHAS COMPRAS</Link>
                </div>
                <form onSubmit={handleSubmit} className={FormStyles.form_container}>

                    <Input
                        text='Nome completo'
                        type='text'
                        name='name'
                        handleOnChange={handleChange}
                        value={user.name || ''}
                    />
                    <Input
                        text='Telefone'
                        type='text'
                        name='phone'
                        handleOnChange={handleChange}
                        value={user.phone || ''}
                    />
                    <Input
                        text='E-mail'
                        type='email'
                        name='email'
                        handleOnChange={handleChange}
                        value={user.email || ''}
                    />
                    <Input
                        text='Senha'
                        type='password'
                        name='passwd'
                        handleOnChange={handleChange}
                    />
                    <Input
                        text='Confirmação da senha'
                        type='password'
                        name='confirmpasswd'
                        handleOnChange={handleChange}
                    />
                    <input type='submit' value='Salvar' />
                </form>
            </div>
        </section>
    )
}

export default Profile