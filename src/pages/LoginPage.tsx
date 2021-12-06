import React from "react"
import styles from "./LoginPage.module.css"
import Header from "../components/Header"
import Login from "../components/Login"

const LoginPage: React.VFC = () => {
	return (
		<div>
			<Header />
			<span>ログインページ</span>
			<Login />
		</div>
	)
}

export default LoginPage
