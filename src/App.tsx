import "./App.module.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticatedRoute from "./components/AuthenticatedRoute"
import { UserProvider } from "./components/UserProvider"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import Memorize from "./pages/Memorize"
import TemplatePage from "./pages/TemplatePage"
import NotFound from "./pages/NotFound"

function App() {
	return (
		<div className="App">
			<UserProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/login" element={<LoginPage />} />
						<AuthenticatedRoute path="/" element={<Home />} />
						<AuthenticatedRoute path="/memorize/:id" element={<Memorize />} />
						<AuthenticatedRoute path="/template" element={<TemplatePage />} />
						<AuthenticatedRoute path="/*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</UserProvider>
		</div>
	)
}

export default App
