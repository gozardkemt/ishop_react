import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import { Selection } from './Selection.js';
import { SectionWrapper } from './StyleWrappers.js';
import { LanguageContext } from './LanguageContext';


export const FilterBar = ({ activeFilterBar,categories, onChange, setPriceRange, clearAllFilters, setTextQuery, textQuery, setRefs}) => {

	if (activeFilterBar) { return null };

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

const ClearFilterButton = ({onClick}) =>{

	return	(
			<button style={{float: 'right'}} type='button' onClick={onClick}>
				{ useContext(LanguageContext)['clear filters'] }
			</button>
		)
}

ClearFilterButton.propTypes = { clearAllFilters: PropTypes.func }


const TextFilter = ({setTextQuery, textQuery}) => {

	return (
		<>
			<label> {useContext(LanguageContext)['text filter']} </label>
			<input value={textQuery} onChange={setTextQuery} id='textFilter'></input>
		</>
	)

}


TextFilter.propTypes = { setTextQuery: PropTypes.func, textQuery: PropTypes.string }

const PriceRange = ({ setPriceRange, setRefs }) => {

	const trans = useContext(LanguageContext);

	return (
		<>
			<label> {trans['price filter']} </label>
			<input onChange={setPriceRange.min} ref={setRefs.min} id='minFilter' placeholder={trans['from']}></input>
			<input onChange={setPriceRange.max} ref={setRefs.max} id='maxFilter' placeholder={trans['to']}></input>
		</>
	)
}


PriceRange.propTypes = { setPriceRange: PropTypes.object }
