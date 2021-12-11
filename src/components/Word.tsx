import styles from 'Word.module.css'

interface WordProps {
  num: number
  word: string
  place: string
  condition: string
  flags: boolean[]
  handleClick: () => void
}

const Word: React.VFC<WordProps> = ({num, word, place, condition, flags, handleClick}) => {
  return (
    <div>
      {flags[num] ? <span>{word}</span> : <span>{word}(未)</span>}
      <button onClick={handleClick}>ボタン</button>
      {/*flagsがtrueのとき、ピンは青くなって黒帯が外れた状態*/}
      <span>
        {place}で{condition}
      </span>
    </div>
  )
}

export default Word
