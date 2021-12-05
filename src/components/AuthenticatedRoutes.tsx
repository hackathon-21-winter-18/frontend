import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Memorize from "../pages/Memorize"
import TemplatePage from "../pages/TemplatePage"
import NotFound from "../pages/NotFound"

const AuthenticatedRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/memorize/:id" element={<Memorize />} />
			<Route path="/template" element={<TemplatePage />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}

export default AuthenticatedRoutes
