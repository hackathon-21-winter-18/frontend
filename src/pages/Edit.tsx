import * as React from "react"
import { useParams, useLocation } from "react-router"
import AddNewWordDialog from "../components/AddNewWordDialog"
import { EditAddedWord } from "../components/EditAddedWord"
import PushPinIcon from "@mui/icons-material/PushPin"
export const Edit: React.VFC = () => {
	const [open, setOpen] = React.useState(false)
	const [newWord, setNewWord] = React.useState("")
	const [newCoodinate, setNewCoodinate] = React.useState<[number, number]>([
		0, 0,
	])
	const [words, setWords] = React.useState(new Array<string>())
	const [coodinates, setCoodinates] = React.useState(
		new Array<[number, number]>()
	)
	const image = useParams() //あとで使うかも
	const location = useLocation()

	const handleOnClick = (e: React.MouseEvent<HTMLImageElement>) => {
		setNewCoodinate([e.pageX, e.pageY])
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
		setNewWord("")
	}
	const handleClick = () => {
		setWords([...words, newWord])
		setCoodinates([...coodinates, newCoodinate])
		setOpen(false)
		setNewWord("")
	}
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		index: number
	) => {
		const _words = words.slice()
		_words[index] = e.target.value
		setWords([..._words])
	}
	const handleDelete = (index: number) => {
		const _words = words.slice()
		_words.splice(index, 1)
		setWords([..._words])
		const _coodinates = coodinates.slice()
		_coodinates.splice(index, 1)
		setCoodinates([..._coodinates])
	}
	return (
		<div>
			{coodinates.map(([x, y]: [number, number]) => (
				<PushPinIcon
					style={{ position: "absolute", top: y + "px", left: x + "px" }}
				/>
			))}
			<div>
				<img src={location.state.image} alt="map" onClick={handleOnClick} />
			</div>
			<div>
				{words.map((word: string, index: number) => (
					<div>
						<EditAddedWord
							key={index}
							word={word}
							handleChange={(
								e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
							) => handleChange(e, index)}
							handleDelete={() => handleDelete(index)}
						/>
					</div>
				))}
			</div>
			<AddNewWordDialog
				open={open}
				newWord={newWord}
				setNewWord={setNewWord}
				handleClose={handleClose}
				handleClick={handleClick}
			/>
		</div>
	)
}
