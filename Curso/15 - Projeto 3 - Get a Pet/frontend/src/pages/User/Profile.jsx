import { useState, useEffect } from 'react'
import useMessage from '../../hooks/useMessage'
import makeRequest from '../../utils/api'
import Input from '../../components/form/Input'
import RoundedImage from '../../components/layout/RoundedImage'
import style from './Profile.module.css'
import formStyle from '../../components/form/Form.module.css'

function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()
    const {setMessage} = useMessage()

    useEffect(() => {
        const loadUser = async () => {
            const res = await makeRequest('/users/checkuser', 'GET')
            const data = await res.json()

            setUser(data)
        }
        loadUser()
    }, [])

    const onFileChange = (e) => {
        setPreview(e.target.files[0])
        setUser({...user, [e.target.name]: e.target.files[0]})
    }

    const handleChange  = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let msg
        let type = 'success'

        const formData = new FormData()

        Object.keys(user).forEach(key => {
            formData.append(key, user[key])
        })

        try {
            const res = await makeRequest('/users/edit/' + user._id, 'PATCH', formData, true)
            const data = await res.json()
            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201)
                    type = 'error'
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    return (
        <section>
            <div className={style.profile_header}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <RoundedImage src={preview ? URL.createObjectURL(preview) : `${import.meta.env.VITE_API}/data/user/${user.image}`} alt="Imagem de Perfil" />
                )}
            </div>
            <form onSubmit={handleSubmit} className={formStyle.form_container}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    value={user.email || ''}
                    placeholder="Digite seu email"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    value={user.name || ''}
                    placeholder="Digite seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    value={user.phone || ''}
                    placeholder="Digite seu número de telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua nova senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Confirmação de Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Digite sua nova senha novamente"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Atualizar" />
            </form>
        </section>
    )
}

export default Profile