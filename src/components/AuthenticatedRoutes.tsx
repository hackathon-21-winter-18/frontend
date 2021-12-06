import { Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import LoginPage from "../pages/LoginPage"
import Memorize from "../pages/Memorize"
import TemplatePage from "../pages/TemplatePage"
import NotFound from "../pages/NotFound"
//login画面は一時的に入れておきますが最後に消します
const AuthenticatedRoutes: React.VFC = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/memorize/:id" element={<Memorize />} />
			<Route path="/template" element={<TemplatePage />} />
			<Route path="/*" element={<NotFound />} />
		</Routes>
	)
}

export default AuthenticatedRoutes
