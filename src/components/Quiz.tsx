import styles from './Quiz.module.css'
import ExploreIcon from '@mui/icons-material/Explore'
import {useState} from 'react'

const Quiz: React.VFC = () => {
  const [judge, setJudge] = useState(0)
  //どこからからpalaceリストをとってきてpalaceとその中のピンを選ぶ数字をランダムに選ばせる
  //次へを押したらまたランダムに数字を選んでクイズを表示
  //選択肢をクリックしたときにjudgeを1か2に変えるけど正解の選択肢と不正解の選択肢の上下をどうするか、不正解の選択肢をどこから持ってくるを考える
  //(候補: 上下もランダムに0or1で決めて、不正解の選択肢はまたランダムにもう１つピンを取ってくればよさそう)
  return (
    <div className={styles.quiz}>
      <div className={styles.header}>
        <ExploreIcon className={styles.buttonIcon} />
        <span>Quick Quiz</span>
      </div>
      <div className={styles.question}>
        <p className={styles.questionText}>placeでsituationのは？</p>
        <button onClick={() => console.log('1')} className={styles.button1}>
          選択肢
        </button>
        <br />
        <span className={styles.or}>or</span>
        <br />
        <button onClick={() => console.log('2')} className={styles.button2}>
          選択肢
        </button>
      </div>
      <div className={styles.answer}>
        <span>{judge === 2 ? '正解!' : judge === 1 ? '不正解!' : null}</span>
      </div>
      <button onClick={() => console.log('つぎへ')} className={styles.button3}>
        次の問題へ
      </button>
    </div>
  )
}

export default Quiz
