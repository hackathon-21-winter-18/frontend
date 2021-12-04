import { useState } from "react"
import "./Palace.module.css"
import ReactModal from "react-modal"
import palace from "../assets/ヴェルサイユ宮殿.jpg"

function Palace() {
	const [isOpen, setIsOpen] = useState(false)
	const customStyles: ReactModal.Styles = {
		// ダイアログ内のスタイル（中央に表示）
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
		},
		// 親ウィンドウのスタイル
		overlay: {},
	}
	return (
		<div className="Palace">
			<img src={palace} alt="palace1" width="20%" />
			<br />
			<span>ヴェルサイユ宮殿</span>
			<button onClick={() => setIsOpen(true)}>︙</button>
			<ReactModal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
			>
				<button onClick={() => alert("宮殿の編集画面へ")}>宮殿の編集</button>
				<button onClick={() => alert("削除確認ポップアップ表示")}>
					宮殿の削除
				</button>
			</ReactModal>
		</div>
	)
}

export default Palace
