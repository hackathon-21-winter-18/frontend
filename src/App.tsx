import { useState } from "react"
import "./App.module.css"
import { BrowserRouter } from "react-router-dom"
import AuthenticatedRoutes from "./components/AuthenticatedRoutes"
import NotAuthenticatedRoutes from "./components/NotAuthenticatedRoutes"

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(true)

	return (
		<div className="App">
			<BrowserRouter>
				{isAuthenticated ? <AuthenticatedRoutes /> : <NotAuthenticatedRoutes />}
			</BrowserRouter>
		</div>
	)
}

export default App
