import React from 'react';
import { LanguageContext } from './LanguageContext.js';

export default class Selection extends React.Component {

	render() {
		const {categories, onChange, setRefs} = this.props;
		const trans = this.context;

		return (
			<>
				<label> {trans['products categories']} </label>
				<select ref={setRefs.select} onChange={onChange} className='options'>
					<option id='0' value='all' defaultValue>{trans['all']}</option>
					< Options categories={categories} />
				</select>
			</>
		)
	}

}

class Options extends React.Component {

	render() {

		const trans = this.context;

		return (
			<>
			{
				this.props.categories.map( c =>
					<option key={c.id} id={c.id}>{trans[c.name.toLowerCase()]}</option>
				)
			}
			</>
		)
	}
}

Selection.contextType = LanguageContext;
Options.contextType = LanguageContext;
