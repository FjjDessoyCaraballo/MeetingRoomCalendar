import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Calendar() {
	const [selectDate, setSelectDate] = useState (new Date());
	const [bookings, setBookings] = useState([]);
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const token = urlParams.get('token');

		if (token) {
			setAccessToken(token);
			Cookies.set('accessToken', token, { expires: 7});
			window.history.replaceState({}, '', '/calendar');
		}
		else {
			// check if token is already there
			const existingToken = Cookies.get('accessToken');
			if (existingToken) {
				setAccessToken(existingToken);
			}
			else {
				window.location.href = '/';
			}
		}
	}, []);

	const handleLogout = () => {
		window.location.href = '/';
		Cookies.remove('accessToken');
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
}