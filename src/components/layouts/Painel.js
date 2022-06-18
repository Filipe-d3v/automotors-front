import React from "react";

import Styles from './painel.module.css'


export default function Painel() {
    return(
        <section className={Styles.painel}>
            <h2>AutoMotors</h2>
            <h3>Compre ou venda seu Automotor</h3>
        </section>
    )
}