import React, { createContext, useState } from "react"

export const UserContext = createContext({ name: "", id: "", auth: false })

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState({ name: "", id: "", auth: false })
	const login = (name: any, id: any) => {
		setUser({
			name: name,
			id: id,
			auth: true,
		})
	}
	const logout = () => {
		setUser({
			name: "",
			id: "",
			auth: false,
		})
	}
	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	)
}
