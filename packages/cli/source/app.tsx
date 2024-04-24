import React from 'react';
import { useApp, useInput } from 'ink';
import Route from "./views/route.js"

export default function App() {
	const app = useApp()
	useInput((input) => {
		if (input === 'q') {
			app.exit()
		}
	})

	return <Route />
}
