import { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../../context/Context'
import Logo from '../../assets/img/logo.png'
import style from './Navbar.module.css'

function Navbar() {
    const {authenticated, logout} = useContext(Context)

    return (
        <nav className={style.navbar}>
            <div className={style.navbar_logo}>
                <img src={Logo} alt="Get a Pet" />
                <h2>Get a Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to="/">Adotar</Link>
                </li>
                {authenticated.auth ? (
                    <>
                        <li>
                            <Link to="/pet/mypets">Meus Animais</Link>
                        </li>
                        <li>
                            <Link to="/pet/myadoptions">Minhas Adoções</Link>
                        </li>
                        <li>
                            <Link to="/user/profile">Perfil</Link>
                        </li>
                        <li onClick={logout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar-se</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default Navbar