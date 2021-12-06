import { useState } from "react"
import styles from "./Home.module.css"
import Header from "../components/Header"
import Palace from "../components/Palace"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"

const Home: React.VFC = () => {
	const [palaces, setPalaces] = useState([
		//base64で取得するのでそのままsrcに突っ込む
		{
			id: "0",
			name: "Versailles",
			image: palace1,
			embededPins: [{ id: "a1", x: 0, y: 0, word: "apple", memo: "aaa" }],
		},
		{
			id: "1",
			name: "Buckingham",
			image: palace2,
			embededPins: [{ id: "a1", x: 1, y: 1, word: "banana", memo: "bbb" }],
		},
	])
	const listItems = palaces.map((palace) => (
		<li>
			<Palace key={palace.id} palace={palace} />
		</li>
	))
	return (
		<div className={styles.Home}>
			<Header />
			<span>ホーム画面</span>
			<ul>{listItems}</ul>
		</div>
	)
}

export default Home
