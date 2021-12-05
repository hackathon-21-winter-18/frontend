import { useState } from "react"
interface WordProps {
	word: string
	num: number
	flag: boolean[]
	setFlag: any
}
const Word: React.FC<WordProps> = ({ word, num, flag, setFlag }) => {
	const [wordFlag, setWordFlag] = useState(flag)
	function handleClick() {}
	return (
		<div className="Word">
			{wordFlag[num] === false ? (
				<span>{word}未</span>
			) : (
				<span>{word}(未)</span>
			)}
			<button onClick={handleClick}>ボタン</button>
			<span>{wordFlag[num].toString()}</span>
			{/*flagがtrueのとき、ピンは青くなって黒帯が外れた状態*/}
		</div>
	)
}
//現時点では正常に作動しません！！！

export default Word
