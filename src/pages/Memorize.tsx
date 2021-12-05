import { useState } from "react"
import { useLocation } from "react-router"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"

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
interface MemorizeProps {
	palace: Memorizecontents
}

function Memorize() {
	/*
  const [words,setWords]=useState()
  const listItems = words.map((words) => (s
		<oi>
			<Word word={word} />
		</oi>
	))
  */
	const [count, setCount] = useState(0)
	const location = useLocation()
	function handleClick() {
		alert("ダイアログ表示")
	}
	return (
		<div className="Memorize">
			<span>暗記画面</span>
			<br />
			<img src={location.state.palace.image} alt={location.state.palace.name} />
			{/*あとでコンポーネント分ける*/}
			{/*ここに単語一覧(単語単体はコンポーネント分ける)*/}
			<br />
			{count === 0 ? (
				<button onClick={handleClick}>暗記完了！</button>
			) : (
				<span>a</span>
			)}
			{/*条件式の右辺は0じゃなくて取得してきた単語数を表す変数を充てる*/}
		</div>
	)
}

export default Memorize
