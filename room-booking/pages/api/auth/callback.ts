/**
 * The handler below is making a request to 42 api and the payload consists of
 * variables listed by the 42 API documentation:
 * 
 * https://api.intra.42.fr/apidoc/guides/web_application_flow
 * */ 
export default async function handler(req, res) {
	const { code, state } = req.query;

	const clientId = process.env.NEXT_PUBLIC_42_UID;
	const clientSecret = process.env.FORTY_TWO_API_SECRET;

	if (!clientId || !clientSecret) {
		return res.status(500).json({
			error: 'Missing environment variables'
		});
	}

	try {
		const tokenResponse = await fetch('https://api.intra.42.fr/oauth/token', {
			method: 'POST',
			headers: { 'Content-type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				grant_type: 'authorization_code', 
				client_id: clientId,
				client_secret: clientSecret,
				code: code as string,
				redirect_uri: 'http://localhost:3000/api/auth/callback',
				state: state as string
			})
		});

		if (!tokenResponse.ok) {
			throw new Error('Failed to exchange token');
		}

		const tokenData = await tokenResponse.json();

		if (!tokenData.access_token) {
			throw new Error('No access token received')
		}

		res.redirect(`/calendar?token=${tokenData.access_token}`)
	
	} catch (error) {
		console.error(`OAuth error: ${error}`);
		res.status(500).json({error: 'Authentication error'});
	}
}

  // req = HTTP request (incoming data)
  // res = HTTP response (outgoing data)