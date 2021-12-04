import { useState } from "react"
import "./Home.module.css"
import Header from "../components/Header"
import Palace from "../components/Palace"
import palace1 from "../assets/ヴェルサイユ宮殿.jpg"
import palace2 from "../assets/バッキンガム宮殿.jpg"

function Home() {
	const [palaces, setPalaces] = useState([
		{ image: palace1, name: "palace1" },
		{ image: palace2, name: "palace2" },
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
