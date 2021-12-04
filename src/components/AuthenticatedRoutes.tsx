import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage"
import Memorize from "../pages/Memorize"
import NotFound from "../pages/NotFound"

function AuthenticatedRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/memorize" element={<Memorize />} />
			<Route element={<NotFound />} />
		</Routes>
	)
}

export default AuthenticatedRoutes
