import React from "react"
import "./Login.module.css"

function Login() {
	function handleSubmit(e) {
		alert("提出しました")
	}
	return (
		<div className="Login">
			<span>新規登録orログイン</span>
			<form onSubmit={handleSubmit}>
				<input type="text" name="userName" placeholder="ユーザー名" />
				<input type="text" name="passWord" />
				<input type="submit" value="submit" />
			</form>
		</div>
	)
}

export default Login
