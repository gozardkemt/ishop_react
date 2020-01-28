import React,{useContext} from 'react';
import { LanguageContext } from './LanguageContext.js';

export const Selection = ({categories, onChange, setRefs}) => {

	const trans = useContext(LanguageContext);

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

const Options = ({categories}) => {

	const trans = useContext(LanguageContext);

	return (
			<>
			{
				categories.map( c => (
					<option key={c.id} id={c.id}>
						{trans[c.name.toLowerCase()]}
					</option>
				))
			}
			</>
	)
}
