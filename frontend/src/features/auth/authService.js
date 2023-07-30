import axios from 'axios';


const API_URL = '/api/users/'

const register = async(user) => {
    const respo = await axios.post(API_URL, user)

    if(respo.data) {
        localStorage.setItem('user', JSON.stringify(respo.data))
    }

    return respo.data
}

const login = async(user) => {
    const respo = await axios.post(API_URL + 'login', user)

    if(respo.data) {
        localStorage.setItem('user', JSON.stringify(respo.data))
    }

    return respo.data
}

const logout = () => {
    localStorage.removeItem('user')
}


const authService = {
    register,
    logout,
    login
}

export default authService