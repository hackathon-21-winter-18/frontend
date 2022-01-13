import styles from './App.module.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {UserProvider} from './components/UserProvider'
import Title from './pages/Title'
import PalacePage from './pages/PalacePage'
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
import CallBack from './pages/CallBack'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TitleOutlet from './components/TitleOutlet'
import {TemplatePreview} from './pages/TemplatePreview'

function App() {
  return (
    <div className={styles.app}>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitleOutlet />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/callback" element={<CallBack />} />
            <Route element={<AuthenticatedRoute />}>
              <Route element={<Layout />}>
                <Route element={<SideLayout />}>
                  <Route path="/palace" element={<PalacePage />} />
                  <Route path="/template" element={<TemplatePage />} />
                </Route>
                <Route path="/edit/:base64/*" element={<Edit />} />
                <Route path="/fix/:id" element={<Fix />} />
                <Route path="/fixTemplate/:id" element={<FixTemplate />} />
                <Route path="/editTemplate/:base64/*" element={<EditTemplate />} />
              </Route>
            </Route>
            <Route element={<Layout />}>
              <Route element={<SideLayout />}>
                <Route path="/sharedPalaces" element={<SharedPalaces />} />
                <Route path="/sharedTemplates" element={<SharedTemplates />} />
                <Route path="/playground" element={<Playground />} />
              </Route>
              <Route path="/memorize/:id" element={<Memorize />} />
              <Route path="/fromTemplate/:id" element={<EditFromTemplate />} />
              <Route path="/templatePreview/:id" element={<TemplatePreview />} />
              <Route path="/*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App
