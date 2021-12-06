import { useState } from "react"
import { Link } from "react-router-dom"
import ReactModal from "react-modal"

interface TemplateContents {
	id: string
	name: string
	image: string
	pins: Pins[]
	createdBy: string
}
interface Pins {
	id: string
	x: Number
	y: Number
}
interface TemplateProps {
	template: TemplateContents
}

const Template: React.VFC<TemplateProps> = ({ template }) => {
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
		<div>
			<Link to={"/fromTemplate/" + template.id}>
				<img src={template.image} alt={template.name} width="20%" />
			</Link>
			<br />
			<span>{template.name}</span>
			<button onClick={() => setIsOpen(true)}>︙</button>
			<ReactModal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				style={customStyles}
			>
				<button onClick={() => alert("宮殿の編集画面へ")}>
					テンプレートの編集
				</button>
				<br />
				<button onClick={() => alert("削除確認ポップアップ表示")}>
					テンプレートの削除
				</button>
			</ReactModal>
		</div>
	)
}

export default Template
