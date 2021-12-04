import { useState } from "react"
import "./Login.module.css"

function Login() {
	const [userName, setUserName] = useState("")
	const [passWord, setPassWord] = useState("")

	function handleSubmit() {
		alert("POSTする")
	}
	function handleUserNameChange(e: any) {
		setUserName(e.target.value)
	}
	function handlePassWordChange(e: any) {
		setPassWord(e.target.value)
	}
	return (
		<div className="Login">
			<span>新規登録orログイン</span>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="userName"
					placeholder="ユーザー名"
					onChange={handleUserNameChange}
				/>
				<input
					type="text"
					name="passWord"
					placeholder="パスワード"
					onChange={handlePassWordChange}
				/>
				<input type="submit" value="submit" />
			</form>
		</div>
	)
}
//stateに入れてボタン押したときにPOST
export default Login
