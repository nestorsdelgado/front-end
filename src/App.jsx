import { useEffect, useState } from 'react'
import { fetchSabores } from './api/sabores'
import { fetchMezclas } from './api/sabores'
import { API_URL } from './api/sabores'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx'
import Error from './components/Error/Error.jsx'
import Home from './components/Home/Home.jsx'
import Account from './components/Account/Account.jsx'
import Footer from './components/Footer/Footer.jsx'
import MostLiked from './components/MostLiked/MostLiked.jsx'
import CreateMix from './components/CreateMix/CreateMix.jsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [sabores, setSabores] = useState([])
  const [mezclas, setMezclas] = useState([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const setInitialSabores = async () => {
    setLoading(true)
    setError(null)
    try {
      const sabores = await fetchSabores()
      setSabores(sabores)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  const setInitialMezclas = async () => {
    setLoading(true)
    setError(null)
    try {
      const mezclas = await fetchMezclas()
      setMezclas(mezclas)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setInitialSabores()
  }, [])

  useEffect(() => {
    setInitialMezclas()
  }, [])

  function ScrollToTop() {
    const { pathname, search } = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [pathname, search])

    return null
  }

  return (

    <div>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="*" exact Component={Error} />
          <Route path="/" exact element={<Home mezclas={mezclas} setInitialMezclas={setInitialMezclas} loading={loading} error={error} />} />
          <Route path="/most-liked" exact element={<MostLiked mezclas={mezclas} setInitialMezclas={setInitialMezclas} loading={loading} error={error} />} />
          <Route path="/create-mix" exact element={<CreateMix sabores={sabores} />} />
          <Route path="/account" exact element={<Account mezclas={mezclas} setInitialMezclas={setInitialMezclas} loading={loading} error={error} />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </div>
  )
}

export default App