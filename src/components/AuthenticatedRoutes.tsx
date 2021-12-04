import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage"
import NotFound from "../pages/NotFound"

function AuthenticatedRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route element={<NotFound />} />
		</Routes>
	)
}

export default AuthenticatedRoutes
