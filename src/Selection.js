import React from 'react';
import Options from './Options.js';

export default class Selection extends React.Component {

	render() {

		const {categories, onChange} = this.props;

		return (

			<select onChange={ onChange } className='options'>
				<option id='0' defaultValue>Všetky</option>
				< Options categories={ categories } />
			</select>

		)
	}

}
