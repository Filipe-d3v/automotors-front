import Styles from './footer.module.css';

import {FaGithub, FaLinkedin, FaWhatsappSquare} from 'react-icons/fa'

function Footer(){
    return(
        <footer className={Styles.footer}>
            <div className={Styles.content}>
            <p className={Styles.socials}>
                <a href='https://github.com/Filipe-d3v'><FaGithub /></a>
                <a href='www.linkedin.com/in/filipe-d3v'><FaLinkedin /></a>
                <a href='https://api.whatsapp.com/send?phone=5538999088972'><FaWhatsappSquare /></a>
            </p>
            <br />
            <p>
                <span className='bold'>Created by Filipe-d3v</span>
                <br></br>
                <br></br>
                <span className='bold'>AutoMotors</span> &copy; 2022
            </p>
            </div>
        </footer>
    )
}

export default Footer