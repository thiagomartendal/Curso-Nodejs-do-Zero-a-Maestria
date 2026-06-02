import { useCallback } from 'react'
import bus from '../utils/bus'

function useMessage() {
    const setMessage = useCallback((msg, type) => {
        bus.emit('flash', {
            message: msg,
            type: type
        })
    }, [])

    return {setMessage}
}

export default useMessage