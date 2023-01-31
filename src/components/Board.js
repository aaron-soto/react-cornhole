import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDocs, getDoc, doc, query, where, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

export const Board = () => {
	let { boardId } = useParams();
	let [newPlayerName, setNewPlayerName] = useState('')
	let [board, setBoard] = useState({});
	let [isAddingPLayer, setIsAddingPlayer] = useState(false);

	let retrieveDoc = async () => {
		const docRef = doc(db, "boards", boardId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			let data = docSnap.data()
			setBoard(data)
		console.log("Document data:", docSnap.data());
		} else {
		console.log("No such document!");
		}
	};

	useEffect(() => {
		retrieveDoc();
	}, []);

	const handleOpenAddPlayer = (event) => {
		event.preventDefault();
		setIsAddingPlayer(!isAddingPLayer);
	};
	const handleAddNewPlayer = async () => {
		const boardRef = doc(db, 'boards', board.uuid);
		await updateDoc(boardRef, {
			users: arrayUnion({
				name: newPlayerName,
				uuid: uuidv4(),
				wins: 0,
				losses: 0,
				gamesPlayed: 0,
			}),
		});
		setIsAddingPlayer(false)
		setNewPlayerName('')
	};

	return (
		<div className='board'>
			{isAddingPLayer ? (
				<div className='adding-player'>
					<h2>Add New Player</h2>
					<input value={newPlayerName} onChange={(e) => setNewPlayerName(e.target.value)} type='text' placeholder='Player Name' />
					<button onClick={handleAddNewPlayer}>Add Player</button>
				</div>
			) : (
				''
			)}
			<h3>{board?.name}</h3>
			<p>Owner: {board?.owner}</p>
			<a href='#' onClick={(e) => handleOpenAddPlayer(e)}>
				Add Player
			</a>
			<a href='#'>Play Game</a>

			{ board && board?.users?.map((user) => {
				return(
					<p>{user.name}</p>
				)
			})}
		</div>
	);
};
