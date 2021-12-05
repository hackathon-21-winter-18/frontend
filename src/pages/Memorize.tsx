import { useState } from "react"
import { useParams } from "react-router"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"
import Word from "../components/Word"

interface Memorizecontents {
	ID: number
	Name: string
	image: any
	pins: Pin[]
	CreatedBy: number
}
interface Pin {
	ID: number
	x: number
	y: number
}

function Memorize() {
	const [flag, setFlag] = useState([...Array(2)].fill(false)) //2のところは取得したembededPinsの数を充てる
	const params = useParams()
	//paramsが宮殿のidなのでaxiosで宮殿情報取得
	const [samplePalace, setSamplePalace] = useState({
		id: "0",
		name: "Versailles",
		image: palace1,
		embededPins: [
			{ id: "a1", x: 0, y: 0, word: "apple", memo: "aaa" },
			{ id: "a2", x: 1, y: 1, word: "banana", memo: "bbb" },
		],
	})
	const listItems = samplePalace.embededPins.map((pin, index) => (
		<li>
			<Word
				key={index}
				word={pin.word}
				num={index}
				flag={flag}
				setFlag={setFlag}
			/>
		</li>
	))

	function handleClick() {
		alert("ダイアログ表示")
		console.log(params)
	}
	return (
		<div className="Memorize">
			<span>暗記画面</span>
			<br />
			{
				//<img src={} alt={location.state.palace.name} />
			}
			{params.id === "0" ? (
				<img src={palace1} alt={samplePalace.name} />
			) : (
				<img src={palace2} alt={samplePalace.name} />
			)}
			{/*あとでコンポーネント分ける*/}
			<ol>{listItems}</ol>
			<br />
			{flag.every((value) => value === false) ? (
				<button onClick={handleClick}>暗記完了！</button>
			) : null}
			{/*flagの中身が全部trueなら表示*/}
		</div>
	)
}

export default Memorize
