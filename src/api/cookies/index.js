import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken(key) {
    return Cookies.get(key)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
