import { Link } from 'react-router-dom';
import { useContext } from 'react';


import Styles from './nav.module.css'
import Logo from '../../assets/pistao.png'
import { FaUser } from 'react-icons/fa'
import { MdLogout } from 'react-icons/md'
import { MdMenu, MdClose } from 'react-icons/md'

import { Context } from '../../context/UserContext'

function Nav() {
    const { authenticated, logout } = useContext(Context)

    function Open() {
        document.getElementById('menuSide').style.width = '200px'
        document.getElementById('list').style.display = 'block'
    }
    function Close() {
        document.getElementById('menuSide').style.width = '0px'
        document.getElementById('list').style.display = 'none'
    }
    return (
        <>
            <nav className={Styles.nav}>
                <div className={Styles.nav_logo}>
                    <img src={Logo} alt='AutoMotors' />
                    <h4>AutoMotors</h4>
                </div>
                <p id='menu' onClick={Open}><MdMenu /></p>
                <ul>
                    <li>
                        <Link to='/'>HOME</Link>
                    </li>
                    {authenticated ? (<>
                        <li>
                            <Link to='/product/myproducts'>VEICULOS</Link>
                        </li>
                        <li data-icon='icon'>
                            <Link to='/user/profile'><FaUser /></Link>
                        </li>
                        <li data-icon='icon' onClick={logout}><MdLogout /></li>

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
            </nav >
            <div id='menuSide' className={Styles.menu_side}>
                <i onClick={Close}><MdClose /></i>
                <ul id='list'>
                    <li onClick={Close}>
                        <Link to='/'>HOME</Link>
                    </li>
                    {authenticated ? (<>
                        <li onClick={Close}>
                            <Link to='/product/myproducts'>VEICULOS</Link>
                        </li >
                        <li data-icon='icon' onClick={Close}>
                            <Link to='/user/profile'><FaUser /></Link>
                        </li>
                        <li onClick={Close} data-icon='icon'>
                            <a onClick={logout}> <MdLogout /> </a>
                        </li>

                    </>) : (<>

                        <li onClick={Close}>
                            <Link to='/login'>ENTRAR</Link>
                        </li>
                        <li onClick={Close}>
                            <Link to='/register'>CADASTRAR</Link>
                        </li>

                    </>)
                    }
                </ul >
            </div>
        </>
    )
}

export default Nav