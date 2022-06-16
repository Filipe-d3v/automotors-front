import React from "react";

import Styles from './painel.module.css'


export default function Painel() {
    return(
        <section className={Styles.painel}>
            <h2>AutoMotors</h2>
            <h3>Apegue e desapegue</h3>
            <h3>Compre e venda seu Automotor</h3>
        </section>
    )
}