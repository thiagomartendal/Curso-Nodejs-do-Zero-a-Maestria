import { useEffect } from 'react'
import Context from './Context'
import useAuth from '../hooks/useAuth'

function UserProvider({children}) {
    const {register, authenticated, loadAuth, login, logout} = useAuth()

    useEffect(() => {
        loadAuth()
    }, [loadAuth])

    return (
        <Context.Provider value={{authenticated, register, login, logout}}>
            {children}
        </Context.Provider>
    )
}

export default UserProvider