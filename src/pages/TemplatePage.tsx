import { useState } from "react"
import styles from "TemplatePage.module.css"
import Header from "../components/Header"
import Template from "../components/Template"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"

const TemplatePage: React.VFC = () => {
	const [templates, setTemplates] = useState([
		//base64で取得するのでそのままsrcに突っ込む
		{
			id: "0",
			name: "Versailles",
			image: palace1,
			pins: [{ id: "a1", x: 0, y: 0 }],
			createdBy: "mehm8128",
		},
		{
			id: "1",
			name: "Buckingham",
			image: palace2,
			pins: [{ id: "a1", x: 1, y: 1 }],
			createdBy: "mehm8128",
		},
	])
	const listItems = templates.map((template) => (
		<li>
			<Template key={template.id} template={template} />
		</li>
	))
	return (
		<div>
			<Header />
			<span>テンプレート</span>
			<ul>{listItems}</ul>
		</div>
	)
}

export default TemplatePage
