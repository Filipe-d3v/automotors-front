import Styles from './container.module.css'

export default function Container({ children }) {

    return(
        <main className={Styles.container}>
            
            
            {children}
        </main>
    )
}
