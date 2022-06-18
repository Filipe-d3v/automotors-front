import Styles from './input.module.css';

export default function Input({rows, type, text, name, placeholder, handleOnChange, value, multiple, id, disabled}) {
    return(
        <div className={Styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
            type={type} 
            name={name}
            rows={rows}
            id={id}
            disabled={disabled}
            placeholder={placeholder} 
            onChange={handleOnChange}
            value={value}
            {...(multiple ? {multiple} : '')}
            />
            
        </div>
    )
}