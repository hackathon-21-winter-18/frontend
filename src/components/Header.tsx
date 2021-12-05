import { useState } from "react"
import styles from "./Header.module.css"
import { Link } from "react-router-dom"
import logo from "../assets/脳みそ.png"
import FromNewPalace from "./DialogFromNewPalace"

const Header: React.FC = () => {
	const [userName, setUserName] = useState("(ユーザー名)")
	return (
		<div>
			<img src={logo} alt="logo" width="2%" />
			<span>アプリ名</span>
			<span>{userName}でログイン中</span>
			<button>テンプレート</button>
			{/*ここはあとでLinkにしてページ遷移させる*/}
			<FromNewPalace />
			<button onClick={() => alert("ログアウト")}>ログアウト</button>
			<Link to="login">ログイン</Link>
		</div>
	)
}

export default Header
