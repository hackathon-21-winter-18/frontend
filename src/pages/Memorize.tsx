import { useState, useEffect } from "react"
import { useParams } from "react-router"
import styles from "Memorize.module.css"
import Word from "../components/Word"
import Header from "../components/Header"
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

const Memorize: React.VFC = () => {
	const [flags, setFlags] = useState([...Array(2)].fill(false)) //2のところは取得したembededPinsの数を充てる
	const [palace, setPalace] = useState(null)
	const params = useParams()
	//params.idが宮殿のidなのでaxiosで宮殿情報取得

	//mockPalaces→palaces @
	const listItems = mockPalaces[Number(params.id)].embededPins.map(
		(pin: any, index: any) => (
			<li>
				<Word
					key={pin.id}
					num={index}
					word={pin.word}
					flags={flags}
					handleClick={() =>
						setFlags(flags.map((flag, i) => (i === index ? !flag : flag)))
					}
				/>
			</li>
		)
	)
	function handleClick() {
		alert("ダイアログ表示")
	}
	/*
	paramsに一致する宮殿を取得
	useEffect(() => {
		axios.get("/palaces/me/{userID}").then((res) => {
			const data = res.data
			for (let i = 0; i < data.length; i++) {
				if (data.id === params.id) {
					setPalace(data[i])
				}
			}
		})
	}, []) @
*/
	return (
		<div>
			<Header />
			<span>暗記画面</span>
			<br />
			{/*palace.image,palace.name @*/}
			<img
				src={mockPalaces[Number(params.id)].image}
				alt={mockPalaces[Number(params.id)].name}
			/>
			{/*あとでコンポーネント分けるかも*/}
			<ol>{listItems}</ol>
			<br />
			{flags.every((value) => value) ? (
				<button onClick={handleClick}>暗記完了！</button>
			) : null}
			{/*flagの中身が全部trueなら表示*/}
		</div>
	)
}

export default Memorize
