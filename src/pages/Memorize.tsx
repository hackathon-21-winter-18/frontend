import { useState } from "react"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"

interface Palacecontent {
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
	const [palace, setPalace] = useState({
		ID: 0,
		Name: "samplePalace",
		image: palace1,
		pins: [{ ID: 0, x: 0, y: 0 }],
		CreatedBy: 1,
	})
	/*
  const [words,setWords]=useState()
  const listItems = words.map((words) => (
		<oi>
			<Word word={word} />
		</oi>
	))
  */
	const [count, setCount] = useState(0)

	function handleClick() {
		alert("ダイアログ表示")
	}
	return (
		<div className="Memorize">
			<span>暗記画面</span>
			<br />
			<img src={palace.image} alt={palace.Name} width="30%" />
			ここに単語一覧
			<br />
			{count === 0 ? (
				<button onClick={handleClick}>暗記完了！</button>
			) : (
				<span>a</span>
			)}
			{/*0じゃなくて取得してきた単語数を表す変数を充てる*/}
		</div>
	)
}

export default Memorize
