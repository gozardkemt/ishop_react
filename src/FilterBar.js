import React from 'react';

export default class FilterBar extends React.Component {

	render() {
		const {categories, onChange, activeFilterBar} = this.props;

		if (!activeFilterBar) { return null };

		const sectionStyle = {
			width:'100%',
			textAlign: 'left',
			background: 'skyblue',
			marginTop: '0.5rem'
		}

		return (

			<section style={sectionStyle}>
				< Selection
					  onChange={onChange}
					  categories={categories}
				  />
				<small> CENOVÉ ROZMEDZIE </small>
				<input></input>
				<input></input>
				<button>Hľadať</button>
			 </section>

		)
	}

}

class Selection extends React.Component {

	render() {
		const {categories, onChange} = this.props;

		return (
			<>
				<small> KATEGÓRIE PRODUKTOV </small>
				<select onChange={onChange} className='options'>
					<option id='0' defaultValue>Všetky</option>
					< Options categories={categories} />
				</select>
			</>
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
