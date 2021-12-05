import { useState } from "react"
import { Link } from "react-router-dom"
import "./Palace.module.css"
import ReactModal from "react-modal"

interface Palacecontents {
	id: string
	name: string
	image: any
	embededPins: Pin[]
}
interface Pin {
	id: string
	x: number
	y: number
	word: string
	memo: string
}
interface PalaceProps {
	palace: Palacecontents
}

const Palace: React.FC<PalaceProps> = ({ palace }) => {
	//palaceはオブジェクト
	const [isOpen, setIsOpen] = useState(false)
	const customStyles: ReactModal.Styles = {
		// ダイアログ内のスタイル（中央に表示）
		content: {
			top: "30%",
			bottom: "auto",
			right: "auto",
			left: "50%",
		},
		// 親ウィンドウのスタイル
		overlay: {},
	}
	return (
		<div className="Palace">
			<Link to={"/memorize/" + palace.id}>
				<img src={palace.image} alt={palace.name} width="20%" />
			</Link>
			<br />
			<span>{palace.name}</span>
			<button onClick={() => setIsOpen(true)}>︙</button>
			<ReactModal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
			>
				<button onClick={() => alert("宮殿の編集画面へ")}>宮殿の編集</button>
				<br />
				<button onClick={() => alert("削除確認ポップアップ表示")}>
					宮殿の削除
				</button>
			</ReactModal>
		</div>
	)
}

export default Palace
