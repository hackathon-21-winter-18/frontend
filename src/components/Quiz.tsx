import styles from './Quiz.module.css'
import ExploreIcon from '@mui/icons-material/Explore'
import {useState, useEffect, useRef} from 'react'
import {getPalace} from '../api/palace'
import {PinContent} from '../types'
import {useLocation} from 'react-router-dom'
import userAuth from './UserProvider'

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
  const [pins, setPins] = useState<PinContent[]>(new Array<PinContent>())
  const [quiz, setQuiz] = useState<quizType>({} as quizType)
  const [randomNum, setRandomNum] = useState<randomNumType>(getRandomInt(0, 1) as randomNumType) //正解の選択肢を上に当てはめるか下に当てはめるか
  const location = useLocation()
  const {user} = userAuth()

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }
  const ref1 = useRef<HTMLButtonElement>(null!)
  const ref2 = useRef<HTMLButtonElement>(null!)

  function RandomSelect(passedPins: PinContent[]) {
    if (passedPins.length >= 2) {
      const pinNum = getRandomInt(0, passedPins.length - 1)
      const pin = passedPins[pinNum]
      const pinDummyNum = getRandomInt(0, passedPins.length - 1)
      const pinDummy = passedPins[pinDummyNum]
      setRandomNum(getRandomInt(0, 1) as randomNumType)
      setQuiz({
        place: pin.place,
        situation: pin.situation,
        choice1: pin.word,
        choice2: pinDummy.word,
      })
      setJudge('yet')
      if (pin.word === pinDummy.word) {
        RandomSelect(passedPins)
      }
    }
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
    user.auth &&
      getPalace((res) => {
        if (res.data) {
          let prePins: PinContent[] = new Array<PinContent>()
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].embededPins.length; j++) {
              if (
                res.data[i].embededPins[j].word !== '' &&
                res.data[i].embededPins[j].place !== '' &&
                res.data[i].embededPins[j].situation !== ''
              ) {
                prePins = prePins.concat([
                  {
                    word: res.data[i].embededPins[j].word,
                    place: res.data[i].embededPins[j].place,
                    situation: res.data[i].embededPins[j].situation,
                  },
                ])
              }
            }
          }
          setPins(prePins)
          RandomSelect(prePins)
        }
      })
  }, [location]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className={styles.quiz}>
      {pins.length >= 2 ? (
        <div>
          <div className={styles.header}>
            <ExploreIcon className={styles.buttonIcon} />
            <span>Quick Quiz</span>
          </div>
          <div className={styles.question}>
            <p className={styles.questionText}>
              <span>
                {quiz.place !== '' ? quiz.place : '場所未設定'} で{' '}
                {quiz.situation !== '' ? quiz.situation : '状況未設定'} のは？
              </span>
            </p>
            <button
              onClick={() => handleJudge(ref1.current.value)}
              className={styles.button1}
              ref={ref1}
              value={randomNum === 0 ? quiz.choice1 : quiz.choice2}>
              {randomNum === 0
                ? quiz.choice1 !== ''
                  ? quiz.choice1
                  : '単語未設定'
                : quiz.choice2 !== ''
                ? quiz.choice2
                : '単語未設定'}
            </button>
            <span className={styles.or}>or</span>
            <button
              onClick={() => handleJudge(ref2.current.value)}
              className={styles.button2}
              ref={ref2}
              value={randomNum === 0 ? quiz.choice2 : quiz.choice1}>
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
          {judge !== 'yet' ? (
            <button onClick={() => RandomSelect(pins)} className={styles.button3}>
              <span>次の問題へ</span>
            </button>
          ) : null}
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
