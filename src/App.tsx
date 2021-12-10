import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {UserProvider} from './components/UserProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import Memorize from './pages/Memorize'
import {Edit} from './pages/Edit'
import {Fix} from './pages/Fix'
import TemplatePage from './pages/TemplatePage'
import ErrorPage from './pages/ErrorPage'
import Layout from './components/Layout'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import SignUp from './pages/SignUp'

function App() {
  return (
    <div className={styles.app}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<AuthenticatedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/memorize/:id" element={<Memorize />} />
                <Route path="/edit/:base64/*" element={<Edit />} />
                <Route path="/fix/:id" element={<Fix />} />
                <Route path="/template" element={<TemplatePage />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/*" element={<ErrorPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
