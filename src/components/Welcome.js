export const Welcome = () => {
	return (
		<div className='welcome'>
			<h1>Welcome to cornhole</h1>
			<div className='btn-wrapper'>
				<a href='/create-board'>Create a Room</a>
				<a href='#'>Join a room</a>
			</div>
		</div>
	);
};
