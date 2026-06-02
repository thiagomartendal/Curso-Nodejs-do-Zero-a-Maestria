import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../context/Context'
import Input from '../../components/form/Input'
import style from '../../components/form/Form.module.css'

function Register() {
    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={style.form_container}>
            <h1>Cadastrar-se</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite seu número de telefone"
                    handleOnChange={handleChange}
                />
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
                <Input
                    text="Confirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Digite sua senha novamente"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                <Link to="/login">Acessar conta</Link>
            </p>
        </section>
    )
}

export default Register