import './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import {UserProvider} from './components/UserProvider'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import Memorize from './pages/Memorize'
import {Edit} from './pages/Edit'
import TemplatePage from './pages/TemplatePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="App">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route element={<AuthenticatedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/memorize/:id" element={<Memorize />} />
                <Route path="/edit/:base64/*" element={<Edit />} />
                <Route path="/template" element={<TemplatePage />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
