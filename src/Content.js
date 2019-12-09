import React from 'react';
import ProductItem from './ProductItem.js';
import Options from './Options.js';


export default class Content extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeCategory: '0'
		}
	}

	changeActiveCategory = e => {

		this.setState({
			activeCategory: e.currentTarget.selectedOptions[0].id
		})
	}

	render() {

		const contentStyle = {	display:'grid', gridTemplateColumns:'repeat(3, 1fr)' };
		const {products, categories} = this.props;

		return (
			<>
				<select onChange={ this.changeActiveCategory } className='options'>
					<option id='0' defaultValue>Všetky</option>
					< Options categories={ this.props.categories } />
				</select>
				<main id='content' style={contentStyle} >
					< ProductItem activeCategory={this.state.activeCategory} categories={categories} products={products} />
				</main>
			</>
		)
	}
}
