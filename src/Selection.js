import React from 'react';

export default class Selection extends React.Component {

	render() {
		const {categories, onChange} = this.props;

		return (

			<select onChange={onChange} className='options'>
				<option id='0' defaultValue>Všetky</option>
				< Options categories={categories} />
			</select>

		)
	}

}

class Options extends React.Component {

	render() {

		return (
			<>
			{
				this.props.categories.map( c =>
					<option key={c.id} id={c.id}>{c.name}</option>
				)
			}
			</>
		)
	}
}
