import { ReactNode } from "react"
import { Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import { useContext } from "react"
import { UserContext } from "./UserProvider"

interface AuthenticatedRouteProps {
	path: string
	element: ReactNode
}
const AuthenticatedRoute: React.VFC<AuthenticatedRouteProps> = ({
	path,
	element,
}) => {
	const { user } = useContext(UserContext)

	return
	{
		user.auth ? (
			<Route path={path} element={element} />
		) : (
			<Route path="/login" element={<LoginPage />} />
		)
	}
}

export default AuthenticatedRoute
