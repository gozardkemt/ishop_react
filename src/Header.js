import React from 'react';
import PropTypes from 'prop-types';

export default function Header({onChange, activeFilterBar}) {

	Header.propTypes = {
		onChange: PropTypes.func,
		activeFilterBar: PropTypes.bool,
	}

	const headerStyle = {  width:'100%', background: 'skyblue', display: 'flex', flexDirection: 'row', justifyContent: 'center' };
	const headlineStyle = { fontSize:'3em'};
	const btnStyle = { fontSize:'0.6rem', position: 'absolute', top:'48px', left: '10px' };

	const text = activeFilterBar ? 'SKRY FILTRE' : 'ZOBRAZ FILTRE';

	return (

		<header style={headerStyle}>
		  <button onClick={onChange} style={btnStyle} type='button'>{text}</button>
		  <span style={headlineStyle}>iStore Slovakia w/React</span>
		</header>

	)
}
