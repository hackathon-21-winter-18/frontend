import { useState } from "react"
import "./Palace.module.css"
import ReactModal from "react-modal"

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
interface PalaceProps {
	palace: Palacecontent
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
			<img src={palace.image} alt={palace.Name} width="20%" />
			<br />
			<span>{palace.Name}</span>
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
