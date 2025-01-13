import Aos from 'aos'
import '../../node_modules/aos/dist/aos.css'
import { useEffect } from 'react'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './css/main.css'
import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Global/Layout'
import AppRoutes from './routes/index'
import IsAlreadyLogged from './components/Authentication/IsAlreadyLogged'
import Index from './pages/Index.jsx'
import { SessionContextProvider } from './context/SessionContextProvider'

function App() {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <div>
      <SessionContextProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<IsAlreadyLogged view={Index} />}></Route>
            {AppRoutes.production.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Layout>
        <Toaster />
      </SessionContextProvider>
    </div>
  )
}

export default App
