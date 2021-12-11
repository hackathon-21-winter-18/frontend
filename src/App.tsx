import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {UserProvider} from './components/UserProvider'
import Home from './pages/Home'
import Login from './pages/Login'
import Memorize from './pages/Memorize'
import {Edit} from './pages/Edit'
import {Fix} from './pages/Fix'
import TemplatePage from './pages/TemplatePage'
import {EditTemplate} from './pages/EditTemplate'
import NotFound from './pages/NotFound'
import Layout from './components/Layout'
import AuthenticatedRoute from './components/AuthenticatedRoute'
import SignUp from './pages/SignUp'
import {EditFromTemplate} from './pages/EditFromTemplate'
import {FixTemplate} from './pages/FixTemplate'
import SharedPalaces from './pages/SharedPalaces'
import SharedTemplates from './pages/SharedTemplates'
import SideLayout from './components/SideLayout'
import Playground from './pages/Playground'

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
                <Route element={<SideLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/template" element={<TemplatePage />} />
                  <Route path="/playground" element={<Playground />} />
                </Route>
                <Route path="/memorize/:id" element={<Memorize />} />
                <Route path="/edit/:base64/*" element={<Edit />} />
                <Route path="/fix/:id" element={<Fix />} />
                <Route path="/fixTemplate/:id" element={<FixTemplate />} />
                <Route path="/template" element={<TemplatePage />} />
                <Route path="/editTemplate/:base64/*" element={<EditTemplate />} />
                <Route path="/fromTemplate/:id" element={<EditFromTemplate />} />
                <Route path="/sharedPalaces" element={<SharedPalaces />} />
                <Route path="/sharedTemplates" element={<SharedTemplates />} />
                <Route path="/*" element={<NotFound />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
