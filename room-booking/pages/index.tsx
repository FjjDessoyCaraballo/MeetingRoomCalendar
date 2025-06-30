import { useState, useEffect } from 'react';

export default function Home() {
	const [showPrivacy, setShowPrivacy] = useState(false);
	const [isLoading, setIsloading] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const handlePrivacyNotice = () => {
		setShowPrivacy(true);
	}

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsloading(true);
		setError('');

		try {
			const userToken = await authenticateUser({
				username,
				password
			});

			sessionStorage.setItem("userId", userToken);
			window.location.href = '/calendar';
		} catch (err) {
			console.log("Error: ", err);
		} finally {
			setIsloading(false);
		}

	useEffect(() => {
		const userId = sessionStorage.getItem('userId');
		if (userId) {
		window.location.href = '/calendar';
		}
	}, []);


	}

	return (
		<div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
		<h1>Hive Helsinki Meeting Room Booking</h1>
		
		<form onSubmit={handleLogin}>
			<input 
			type="email" 
			placeholder="Student email"
			value={username}
			onChange={(e) => setUsername(e.target.value)}
			required
			/>
			<input 
			type="password" 
			placeholder="Password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
			/>
			<button type="submit" disabled={isLoading}>
			{isLoading ? 'Logging in...' : 'Login'}
			</button>
		</form>

		{error && <p style={{ color: 'red' }}>{error}</p>}
		</div>
	);
}