async function makeRequest(route, method, data, multipart = false) {
    const baseURL = import.meta.env.VITE_API + route
    const headers = {}

    const options = {
        method,
        headers,
        credentials: 'include'
    }

    if (data)
        if (multipart)
            options['body'] = data
        else {
            headers['Content-Type'] = 'application/json'
            options['body'] = JSON.stringify(data)
        }

    const res = await fetch(baseURL, options)
    return res
}

export default makeRequest