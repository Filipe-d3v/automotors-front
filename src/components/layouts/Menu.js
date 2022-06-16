import React from "react";

import Styles from './menu.module.css'

import { Context } from '../../context/UserContext'
import { useContext } from 'react';

import { Link } from 'react-router-dom'

import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'

export default function Open() {
    const { authenticated, logout } = useContext(Context)

    return(
        <div>

            <div id='menu' className={Styles.menu}>
            <ul>
                <li>
                    <Link to='/'>HOME</Link>
                </li>
                { authenticated ? (<>
                <li>
                    <Link to='/product/myproducts'>MEUS VEICULOS</Link>
                </li>
                <li>
                    <Link to='/user/profile'><FaUser /></Link>
                </li>
                <li onClick={logout}>
                    <a><MdLogout /></a>
                </li>
                
                </>) : (<>
                   
                    <li>
                    <Link to='/login'>ENTRAR</Link>
                </li>
                <li>
                    <Link to='/register'>CADASTRAR</Link>
                </li>
                
                </>)
            }
            </ul >
            </div>
        </div>
    )
}

export function OpenMenu() {
    let style = document.getElementById('menu')
    style.style.width = '200px'
}