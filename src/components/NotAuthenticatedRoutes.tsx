import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import NotFound from "../pages/NotFound"

function NotAuthenticatedRoutes() {
	return (
		<Routes>
			<Route path="/*" element={<LoginPage />} />
			<Route element={<NotFound />} />
		</Routes>
	)
}

export default NotAuthenticatedRoutes
