import "./App.module.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import NotFound from "./pages/NotFound"

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<LoginPage />} />
					<Route element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
