import { useState } from "react"
import styles from "Word.module.css"

interface WordProps {
	num: number
	word: string
	flag: boolean[]
	setFlag: any
}
const Word: React.FC<WordProps> = ({ num, word, flag, setFlag }) => {
	function handleClick() {
		let flag1 = flag
		flag1[num] = !flag1[num]
		setFlag(flag1)
	}
	return (
		<div>
			{flag[num] === true ? <span>{word}</span> : <span>{word}(未)</span>}
			<button onClick={handleClick}>ボタン</button>
			{/*flagがtrueのとき、ピンは青くなって黒帯が外れた状態*/}
		</div>
	)
}
//現時点では正常に作動しません！！！

export default Word
