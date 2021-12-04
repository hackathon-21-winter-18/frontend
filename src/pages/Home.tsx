import { useState } from "react"
import "./Home.module.css"
import Header from "../components/Header"
import Palace from "../components/Palace"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"

function Home() {
	const [palaces, setPalaces] = useState([
		{
			ID: 0,
			Name: "Versailles",
			image: palace1,
			pins: [{ ID: 0, x: 0, y: 0 }],
			CreatedBy: 1,
		},
		{
			ID: 1,
			Name: "Buckingham",
			image: palace2,
			pins: [{ ID: 1, x: 1, y: 1 }],
			CreatedBy: 1,
		},
	])
	const listItems = palaces.map((palace) => (
		<li>
			<Palace palace={palace} />
		</li>
	))
	return (
		<div className="Home">
			<Header />
			<ul>{listItems}</ul>
		</div>
	)
}

export default Home
