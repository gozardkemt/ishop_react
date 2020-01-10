import React from 'react';
import Selection from './Selection.js';
import PropTypes from 'prop-types';


export default class FilterBar extends React.Component {

	render() {

		if (!this.props.activeFilterBar) { return null };

		const {
			categories,
			onChange,
			setPriceRange,
			clearAllFilters,
			setTextQuery,
			textQuery
		} = this.props;

		return (
			< SectionWrapper>
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
				< ClearFilterButton
					onClick={clearAllFilters}
				/>
			</ SectionWrapper>
		)
	}
}

FilterBar.propTypes = {
	categories: PropTypes.array,
	onChange: PropTypes.func,
	activeFilterBar: PropTypes.bool,
	setPriceRange: PropTypes.object,
	clearAllFilters: PropTypes.func,
	setTextQuery: PropTypes.func,
	textQuery: PropTypes.string,
}

// style wrappers

const SectionWrapper = (props) => {

	const sectionStyle = {
		width:'100%',
		textAlign: 'left',
		background: 'skyblue',
		marginTop: '0.5rem'
	}

	return (
		<section style={sectionStyle}>
			{props.children}
		</section>
	)

}

// dumb components

const ClearFilterButton = ({onClick}) => {

	return	(
			<button style={{float: 'right'}} type='button' onClick={onClick}>
				Vymazať filtre
			</button>
		)

}

ClearFilterButton.propTypes = { clearAllFilters: PropTypes.func }


const TextFilter = ({setTextQuery, textQuery}) => {

		return (
			<>
				<label> Textový filter </label>
				<input value={textQuery} onChange={setTextQuery} id='textFilter'></input>
			</>
		)

}

TextFilter.propTypes = { setTextQuery: PropTypes.func, textQuery: PropTypes.string }

const PriceRange = ({setPriceRange}) => {

		return (
			<>
				<label> Cenový filter </label>
				<input onChange={setPriceRange.min} id='minFilter' placeholder='Od'></input>
				<input onChange={setPriceRange.max} id='maxFilter' placeholder='Do'></input>
			</>
		)

}

PriceRange.propTypes = { setPriceRange: PropTypes.object }
