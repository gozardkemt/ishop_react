import React, { useContext} from 'react';
import { LanguageContext } from './LanguageContext';
import { Link } from '@reach/router'
import PropTypes from 'prop-types';

const btnStyle = { fontSize:'0.6rem', position: 'absolute', top:'48px', left: '10px' };
const headerStyle = {  width:'100%', background: 'skyblue', display: 'flex', flexDirection: 'row', justifyContent: 'center' };
const headlineStyle = { fontSize:'3em'};

export const Header = ({ onChange, activeFilterBar, changeLang }) => {

	const trans = useContext(LanguageContext);

	return (

		<header style={headerStyle}>
		  <button onClick={onChange} style={btnStyle} type='button'>
		  	{ activeFilterBar ? trans['hide filters'].toUpperCase() : trans['show filters'].toUpperCase()  }
		  </button>
		  <Link style={headlineStyle} to="/">{trans['istore slovakia']}</ Link>
		  <LangButton changeLang={changeLang}/>
		</header>

	)

}

Header.propTypes = {
	onChange: PropTypes.func,
	activeFilterBar: PropTypes.bool,
	lang: PropTypes.string
}

const LangButton = ({ changeLang }) => {

	const trans = useContext(LanguageContext);

	return (
		<button style={{...btnStyle, top: '10px'}} type='button' onClick={changeLang}>
		  { trans['switch lang'].toUpperCase() }
		</button>
	)

}

LangButton.contextType = LanguageContext;
Header.contextType = LanguageContext;
