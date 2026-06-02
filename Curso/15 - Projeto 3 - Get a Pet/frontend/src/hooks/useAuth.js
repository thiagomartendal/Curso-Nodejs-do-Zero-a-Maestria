import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMessage from './useMessage'
import makeRequest from '../utils/api'

function useAuth() {
    const {setMessage} = useMessage()
    const navigate = useNavigate()

    const [authenticated, setAuthenticated] = useState({auth: undefined, userId: null})

    const register = async (user) => {
        let msg = 'Cadastro realizado com sucesso.'
        let type = 'success'

        try {
            const res = await makeRequest('/users/register', 'POST', user)
            const data = await res.json()

            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201) {
                    type = 'error'
                } else
                    await authUser()
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    const loadAuth = useCallback(async () => {
        try {
            const res = await makeRequest('/users/checkauth', 'POST')
            const data = await res.json()
            setAuthenticated({auth: data.auth, userId: data.userId})
            return data.auth
        } catch (error) {
            setMessage(error.message, 'error')
            setAuthenticated({auth: false, userId: null})
        }
        return false
    }, [setMessage])

    const authUser = async () => {
        const auth = await loadAuth()
        
        if (auth)
            navigate('/')
    }

    const login = async (user) => {
        let msg = 'Você está autenticado.'
        let type = 'success'

        try {
            const res = await makeRequest('/users/login', 'POST', user)
            const data = await res.json()

            if (data) {
                msg = data.message
                if (res.status != 200 && res.status != 201) {
                    type = 'error'
                } else
                    await authUser()
            }
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    const logout = async () => {
        let msg = 'Você se desconectou.'
        let type = 'success'

        setAuthenticated({auth: false, userId: null})

        try {
            await makeRequest('/users/logout', 'POST')
            navigate('/')
        } catch (error) {
            msg = error.message
            type = 'error'
        }

        setMessage(msg, type)
    }

    return {register, authenticated, loadAuth, login, logout}
}

export default useAuth