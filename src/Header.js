import React from 'react';

export default function Header({onChange}) {

	const headerStyle = {  width:'100%', background: 'skyblue', display: 'flex', flexDirection: 'row', justifyContent: 'center' };
	const headlineStyle = { fontSize:'3em'};
	const btnStyle = { fontSize:'0.6rem', position: 'absolute', top:'48px', left: '10px' };

	return (

		<header style={headerStyle}>
		  <button onClick={onChange} style={btnStyle} type='button'>ZOBRAZ FILTRE PRODUKTOV</button>
		  <span style={headlineStyle}>iStore Slovakia w/React</span>
		</header>

	)
}
