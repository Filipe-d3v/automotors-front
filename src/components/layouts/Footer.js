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
                <span className='bold'>Created by Filipe Pereira da Silva</span>
                <br></br>
                <br></br>
                &copy; 2022 <span className='bold'>AutoMotors</span>
            </p>
            </div>
        </footer>
    )
}

export default Footer