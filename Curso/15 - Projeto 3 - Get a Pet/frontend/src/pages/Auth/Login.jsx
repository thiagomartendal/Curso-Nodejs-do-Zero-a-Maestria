import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../context/Context'
import Input from '../../components/form/Input'
import style from '../../components/form/Form.module.css'

function Login() {
    const [user, setUser] = useState({})
    const {login} = useContext(Context)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        login(user)
    }

    return (
        <section className={style.form_container}>
            <h1>Entrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Entrar" />
            </form>
            <p>
                <Link to="/register">Criar Conta</Link>
            </p>
        </section>
    )
}

export default Login