// import Cookies from 'js-cookie'

const TokenKey = 'xc-auth'
const Storage = localStorage;

export function getToken() {
  return Storage.getItem(TokenKey)
}

export function setToken(token) {
  return Storage.setItem(TokenKey, token)
}

export function removeToken() {
  return Storage.removeItem(TokenKey)
}
