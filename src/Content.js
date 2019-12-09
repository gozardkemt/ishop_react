import React from 'react';
import ProductItem from './ProductItem.js';
import Options from './Options.js';

export default class Content extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeCategoryId: '0'
		}
	}

	changeActiveCategoryId = e => {

		this.setState({
			activeCategoryId: e.currentTarget.selectedOptions[0].id
		})
	}

	render() {

		const contentStyle = {	display:'grid', gridTemplateColumns:'repeat(3, 1fr)' };
		const { products, categories } = this.props;

		return (
			<>
				<select onChange={ this.changeActiveCategoryId } className='options'>
					<option id='0' defaultValue>Všetky</option>
					< Options categories={ this.props.categories } />
				</select>
				<main id='content' style={contentStyle} >
					< ProductItem activeCategoryId={this.state.activeCategoryId} categories={categories} products={products} />
				</main>
			</>
		)
	}
}
