import { useState } from "react"
import styles from "./Login.module.css"

const Login: React.VFC = () => {
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
		<div>
			<span>新規登録orログイン</span>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name="userName"
					placeholder="ユーザー名"
					onChange={handleUserNameChange}
				/>
				<br />
				<input
					type="text"
					name="passWord"
					placeholder="パスワード"
					onChange={handlePassWordChange}
				/>
				<br />
				<input type="submit" value="submit" />
			</form>
		</div>
	)
}
export default Login
