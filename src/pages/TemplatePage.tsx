import { useEffect, useState } from "react"
import styles from "TemplatePage.module.css"
import Header from "../components/Header"
import Template from "../components/Template"
import { TemplateType } from "../types"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"
import axios from "axios"

const mockTemplates: TemplateType[] = [
	{
		id: "0",
		name: "Versailles",
		image: palace1,
		pins: [{ number: "a1", x: 0, y: 0 }],
		createdBy: "mehm8128",
	},
	{
		id: "1",
		name: "Buckingham",
		image: palace2,
		pins: [{ number: "a1", x: 1, y: 1 }],
		createdBy: "mehm8128",
	},
]

const TemplatePage: React.VFC = () => {
	const [templates, setTemplates] = useState(null)
	//mockTemplates→templates @
	const listItems = mockTemplates.map((template) => (
		<li>
			<Template key={template.id} template={template} />
		</li>
	))
	/*
	useEffect(() => {
		axios.get("/templates/me/{userID}").then((res) => setTemplates(res.data))
	},[]) @
	*/
	return (
		<div>
			<Header />
			<span>テンプレート</span>
			<ul>{listItems}</ul>
		</div>
	)
}

export default TemplatePage
