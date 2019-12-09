import React from 'react';

export default class Header extends React.Component {

	render() {
		const headerStyle = { fontSize:'3em', width:'100%', textAlign: 'center', background: 'skyblue' };

		return (

			<header style={headerStyle}>
			  iStore Slovakia w/React
			</header>

		)
	}
}
