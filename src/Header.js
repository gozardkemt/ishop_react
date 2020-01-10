import React from 'react';
import PropTypes from 'prop-types';

export default function Header({onChange, activeFilterBar}) {

	const headerStyle = {  width:'100%', background: 'skyblue', display: 'flex', flexDirection: 'row', justifyContent: 'center' };
	const btnStyle = { fontSize:'0.6rem', position: 'absolute', top:'48px', left: '10px' };
	const headlineStyle = { fontSize:'3em'};

	return (

		<header style={headerStyle}>
		  <button onClick={onChange} style={btnStyle} type='button'>
		  { activeFilterBar ? 'SKRY FILTRE' : 'ZOBRAZ FILTRE' }
		  </button>
		  <span style={headlineStyle}>iStore Slovakia w/React</span>
		</header>

	)
}

Header.propTypes = {
	onChange: PropTypes.func,
	activeFilterBar: PropTypes.bool,
}
