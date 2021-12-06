import { useEffect, useState } from "react"
import styles from "./Home.module.css"
import Header from "../components/Header"
import Palace from "../components/Palace"
import { PalaceType } from "../types"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"
import axios from "axios"

const mockPalaces: PalaceType[] = [
	{
		id: "0",
		name: "Versailles",
		image: palace1,
		embededPins: [
			{ number: "a1", x: 0, y: 0, word: "apple", memo: "aaa" },
			{ number: "a2", x: 1, y: 1, word: "banana", memo: "bbb" },
		],
	},
	{
		id: "1",
		name: "Buckingham",
		image: palace2,
		embededPins: [
			{ number: "a1", x: 0, y: 0, word: "apple", memo: "aaa" },
			{ number: "a2", x: 1, y: 1, word: "banana", memo: "bbb" },
		],
	},
]
const Home: React.VFC = () => {
	const [palaces, setPalaces] = useState(null)
	//mockPalaces→palaces @
	const listItems = mockPalaces.map((palace) => (
		<li>
			<Palace key={palace.id} palace={palace} />
		</li>
	))
	/*
	useEffect(() => {
		axios.get("/palaces/me/{userID}").then((res) => setPalaces(res.data))
	}, []) @
*/
	return (
		<div className={styles.Home}>
			<Header />
			<span>ホーム画面</span>
			<ul>{listItems}</ul>
		</div>
	)
}

export default Home
