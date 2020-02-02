import React from 'react';
import Selection from './Selection.js';
import PropTypes from 'prop-types';
import { SectionWrapper } from './StyleWrappers.js';
import { LanguageContext } from './LanguageContext';


export default class FilterBar extends React.Component {

	render() {

		if (!this.props.activeFilterBar) { return null };

		const {
			categories,
			onChange,
			setPriceRange,
			clearAllFilters,
			setTextQuery,
			textQuery,
			setRefs
		} = this.props;

		return (
			< SectionWrapper>
				< Selection
					  onChange={onChange}
					  categories={categories}
					  setRefs={setRefs}
				  />
				< PriceRange
					  setPriceRange={setPriceRange}
					  setRefs={setRefs}
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

// dumb components

class ClearFilterButton extends React.Component {

	render() {

		return	(
				<button style={{float: 'right'}} type='button' onClick={this.props.onClick}>
					{ this.context['clear filters'] }
				</button>
			)
		}

}

ClearFilterButton.propTypes = { clearAllFilters: PropTypes.func }


class TextFilter extends React.Component {

	render() {

		const {setTextQuery, textQuery} = this.props;

		return (
			<>
				<label> {this.context['text filter']} </label>
				<input value={textQuery} onChange={setTextQuery} id='textFilter'></input>
			</>
		)
	}

}


TextFilter.propTypes = { setTextQuery: PropTypes.func, textQuery: PropTypes.string }

class PriceRange extends React.Component {

	render() {

		const {setPriceRange, setRefs} = this.props;
		const trans = this.context;

		return (
			<>
				<label> {trans['price filter']} </label>
				<input onChange={setPriceRange.min} ref={setRefs.min} id='minFilter' placeholder={trans['from']}></input>
				<input onChange={setPriceRange.max} ref={setRefs.max} id='maxFilter' placeholder={trans['to']}></input>
			</>
		)
	}

}

ClearFilterButton.contextType = LanguageContext;
TextFilter.contextType = LanguageContext;
PriceRange.contextType = LanguageContext;

PriceRange.propTypes = { setPriceRange: PropTypes.object }
