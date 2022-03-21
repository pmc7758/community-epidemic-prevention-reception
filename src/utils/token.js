const key = 'geek-cepr'
export const setToken = (token) => {
  localStorage.setItem(key, token)
}

export const getToken = () => localStorage.getItem(key)

export const removeToken = () => {
  localStorage.removeItem(key)
}
