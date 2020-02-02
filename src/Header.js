import React from 'react';
<<<<<<< HEAD

export default function Header() {

	const headerStyle = { fontSize:'3em', width:'100%', textAlign: 'center', background: 'skyblue' };

	return (

		<header style={headerStyle}>
		  iStore Slovakia w/React
		</header>

	)
}
=======
import { Link } from '@reach/router'
import PropTypes from 'prop-types';
import { LanguageContext } from './LanguageContext';

const btnStyle = { fontSize:'0.6rem', position: 'absolute', top:'48px', left: '10px' };

export default class Header extends React.Component {

 render() {

		const { onChange, activeFilterBar, changeLang } = this.props;
		const headerStyle = {  width:'100%', background: 'skyblue', display: 'flex', flexDirection: 'row', justifyContent: 'center' };
		const headlineStyle = { fontSize:'3em'};

		const trans = this.context;

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
}

Header.propTypes = {
	onChange: PropTypes.func,
	activeFilterBar: PropTypes.bool,
	lang: PropTypes.string
}

class LangButton extends React.Component {

	render() {

		const trans = this.context;
		const { changeLang } = this.props;

		return (
			<button style={{...btnStyle, top: '10px'}} type='button' onClick={changeLang}>
			  { trans['switch lang'].toUpperCase() }
			</button>
		)
	}
}

LangButton.contextType = LanguageContext;
Header.contextType = LanguageContext;
>>>>>>> classed
