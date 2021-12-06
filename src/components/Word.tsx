import { useState } from "react"
import styles from "Word.module.css"

interface WordProps {
	num: number
	word: string
	flags: boolean[]
	handleClick: () => void
}
const Word: React.VFC<WordProps> = ({ num, word, flags, handleClick }) => {
	return (
		<div>
			{flags[num] ? <span>{word}</span> : <span>{word}(未)</span>}
			<button onClick={handleClick}>ボタン</button>
			{/*flagsがtrueのとき、ピンは青くなって黒帯が外れた状態*/}
		</div>
	)
}
//現時点では正常に作動しません！！！

export default Word
