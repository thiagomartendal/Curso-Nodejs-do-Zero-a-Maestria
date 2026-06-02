import style from './Input.module.css'

function Input({type, text, name, placeholder, handleOnChange, value, multiple}) {
    return (
        <div className={style.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleOnChange}
                {...(multiple ? {multiple} : '')}
            />
        </div>
    )
}

export default Input