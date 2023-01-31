import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../firebase';
import { addDoc, doc, collection, setDoc } from 'firebase/firestore';
import { Spinner } from './Spinner';
import { useNavigate } from 'react-router-dom';

export const CreateBoard = () => {
	const navigate = useNavigate();
	const [boardName, setBoardName] = useState('');
	const [ownerName, setOwnerName] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	let newBoardID = uuidv4();

	const handleBoardName = (event) => {
		setBoardName(event.target.value);
	};

	const handleOwnerName = (event) => {
		setOwnerName(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setIsLoading(true);

		let newBoard = {
			name: boardName,
			uuid: newBoardID,
			owner: ownerName,
			users: [
				{
					name: ownerName,
					uuid: uuidv4(),
					wins: 0,
					losses: 0,
					gamesPlayed: 0,
				},
			],
		};

		// clear inputs
		setBoardName('');
		setOwnerName('');

		// create room
		// await addDoc(collection(db, 'boards'), newBoard).then((res) => {
		// 	setIsLoading(false);
		// 	navigate(`/board/${newBoardID}`);
		// });
		await setDoc(doc(db, 'boards', newBoardID), newBoard).then((res) => {
			setIsLoading(false);
			navigate(`/board/${newBoardID}`);
		})
	};

	return isLoading ? (
		<Spinner />
	) : (
		<div className='create-board'>
			<h2>Create Board</h2>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={boardName}
					onChange={handleBoardName}
					placeholder='Board Name'
				/>
				<input
					type='text'
					value={ownerName}
					onChange={handleOwnerName}
					placeholder='Owner'
				/>
				<button type='submit'>Create Board</button>
			</form>
		</div>
	);
};
