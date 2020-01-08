import React from 'react';
import Selection from './Selection.js';

export default class FilterBar extends React.Component {

	render() {
		const {categories, onChange, activeFilterBar, setPriceRange} = this.props;

		if (!activeFilterBar) { return null };

		const sectionStyle = {
			width:'100%',
			textAlign: 'left',
			background: 'skyblue',
			marginTop: '0.5rem'
		}

		const btnStyle = {float: 'right'};

		return (

			<section style={sectionStyle}>
				< Selection
					  onChange={onChange}
					  categories={categories}
				  />
				< PriceRange
					  setPriceRange={setPriceRange}
				  />
				<button style={btnStyle} type='button'>Vymazať všetky filtre</button>
			 </section>

		)
	}
}

class PriceRange extends React.Component {

	render() {

		const {setPriceRange} = this.props;

		return (
			<>
				<label> Cenové rozmedzie </label>
				<input id='minFilter'></input>
				<input id='maxFilter'></input>
				<button onClick={setPriceRange} type='button'>Hľadať</button>
			</>
		)

	}
}
