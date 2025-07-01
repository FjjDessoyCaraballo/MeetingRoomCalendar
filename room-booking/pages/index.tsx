export default function Home() {
	const handleLogin = () => {
		const CLIENT_ID = process.env.NEXT_PUBLIC_42_UID;

		if (!CLIENT_ID) {
			alert('CLIENT_ID not found in environment variables');
			return ;
		}

		window.location.href=`https://api.intra.42.fr/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code`;
	};
	return (
		<div>
			<h1>Hive Helsinki Meeting Room Booking</h1>
			<button onClick={handleLogin}>42 Authentication</button>
		</div>
	);
}