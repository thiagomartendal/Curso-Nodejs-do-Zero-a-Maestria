import style from './Select.module.css'

function Select({text, name, options, value, handleOnChange}) {
    return (
        <div className={style.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleOnChange} value={value || ''}>
                <option>Selecione uma cor</option>
                {options.map(color =>
                    <option value={color} key={color}>{color}</option>
                )}
            </select>
        </div>
    )
}

export default Select