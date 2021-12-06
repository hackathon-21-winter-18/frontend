import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import NotFound from "../pages/NotFound"

const NotAuthenticatedRoutes: React.VFC = () => {
	return (
		<Routes>
			<Route path="/*" element={<LoginPage />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}

export default NotAuthenticatedRoutes
