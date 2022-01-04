import styles from './Quiz.module.css'
import ExploreIcon from '@mui/icons-material/Explore'
import {useState, useEffect, useRef} from 'react'
import {getPalace} from '../api/palace'
import {PalaceType} from '../types'
import {useLocation} from 'react-router-dom'

type quizType = {
  place: string
  situation: string
  choice1: string
  choice2: string
}
type judge = 'AC' | 'WA' | 'yet'
type randomNumType = 0 | 1
const Quiz: React.VFC = () => {
  const [judge, setJudge] = useState<judge>('yet')
  const [palaces, setPalaces] = useState(new Array<PalaceType>())
  const [quiz, setQuiz] = useState<quizType>({} as quizType)
  const [randomNum, setRandomNum] = useState<randomNumType>(getRandomInt(0, 1) as randomNumType)
  const location = useLocation()

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }
  const ref1 = useRef<HTMLButtonElement>(null!)
  const ref2 = useRef<HTMLButtonElement>(null!)

  function RandomSelect(passedPalaces: PalaceType[]) {
    const palaceNum = getRandomInt(0, passedPalaces.length - 1)
    const pinNum = getRandomInt(0, passedPalaces[palaceNum].embededPins.length - 1)
    const pin = passedPalaces[palaceNum].embededPins[pinNum]
    const palaceDummyNum = getRandomInt(0, passedPalaces.length - 1)
    const pinDummyNum = getRandomInt(0, passedPalaces[palaceDummyNum].embededPins.length - 1)
    const pinDummy = passedPalaces[palaceDummyNum].embededPins[pinDummyNum]
    setRandomNum(getRandomInt(0, 1) as randomNumType)
    setQuiz({
      place: pin.place,
      situation: pin.situation,
      choice1: pin.word,
      choice2: pinDummy.word,
    })
    setJudge('yet')
  }
  function handleJudge(value: string) {
    if (judge === 'yet') {
      if (value === quiz.choice1) {
        setJudge('AC')
      } else {
        setJudge('WA')
      }
    }
  }
  useEffect(() => {
    getPalace((res) => {
      if (res.data) {
        setPalaces(res.data)
        RandomSelect(res.data)
      }
    })
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.quiz}>
      {palaces.length !== 0 ? (
        <div>
          <div className={styles.header}>
            <ExploreIcon className={styles.buttonIcon} />
            <span>Quick Quiz</span>
          </div>
          <div className={styles.question}>
            <p className={styles.questionText}>
              {quiz.place !== '' ? quiz.place : '場所未設定'}で{quiz.situation !== '' ? quiz.situation : '状況未設定'}
              のは？
            </p>
            <button
              onClick={() => handleJudge(ref1.current.value)}
              className={styles.button1}
              ref={ref1}
              value={quiz.choice1}>
              {randomNum === 0
                ? quiz.choice1 !== ''
                  ? quiz.choice1
                  : '単語未設定'
                : quiz.choice2 !== ''
                ? quiz.choice2
                : '単語未設定'}
            </button>
            <br />
            <span className={styles.or}>or</span>
            <br />
            <button
              onClick={() => handleJudge(ref2.current.value)}
              className={styles.button2}
              ref={ref2}
              value={quiz.choice2}>
              {randomNum === 0
                ? quiz.choice2 !== ''
                  ? quiz.choice2
                  : '単語未設定'
                : quiz.choice1 !== ''
                ? quiz.choice1
                : '単語未設定'}
            </button>
          </div>
          <div className={styles.answer}>
            <span>{judge === 'AC' ? '正解!' : judge === 'WA' ? '不正解!' : null}</span>
          </div>
          <button onClick={() => RandomSelect(palaces)} className={styles.button3}>
            次の問題へ
          </button>
        </div>
      ) : (
        <div>
          <div className={styles.header}>
            <ExploreIcon className={styles.buttonIcon} />
            <span>Quick Quiz</span>
          </div>
          <div className={styles.question}>
            <p className={styles.questionText}>宮殿を作成してクイズに挑戦してみましょう</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Quiz
