const calulcateBaseURl = () => {
  if (import.meta.env.MODE !== 'development') {
    return '/api'
  }
  return 'http://localhost:4000/api'
}

const baseUrl = calulcateBaseURl()

export default baseUrl
