import React from 'react';
import Selection from './Selection.js';

export default class FilterBar extends React.Component {

	render() {
		const {categories, onChange, activeFilterBar, setPriceRange, clearAllFilters, setTextQuery, textQuery} = this.props;

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
				< TextFilter
					setTextQuery={setTextQuery}
					textQuery={textQuery}
				/>
				<button style={btnStyle} type='button' onClick={clearAllFilters}>Vymazať filtre</button>
			 </section>

		)
	}
}

class TextFilter extends React.Component {

	render() {

		const {setTextQuery, textQuery} = this.props;

		return (
			<>
				<label> Textový filter </label>
				<input value={textQuery} onChange={setTextQuery} id='textFilter'></input>
			</>
		)

	}
}

class PriceRange extends React.Component {

	render() {

		const {setPriceRange} = this.props;

		return (
			<>
				<label> Cenový filter </label>
				<input onChange={setPriceRange.min} id='minFilter' placeholder='Od'></input>
				<input onChange={setPriceRange.max} id='maxFilter' placeholder='Do'></input>
			</>
		)

	}
}
