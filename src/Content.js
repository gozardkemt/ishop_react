import React from 'react';
import ProductItem from './ProductItem.js';

export default class Content extends React.Component {

	render() {

		const contentStyle = {	display:'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(3, min-content)'};
		const { products, categories, activeCategoryId } = this.props;

		return (

			<main id='content' style={contentStyle} >
				< ProductItem activeCategoryId={activeCategoryId} categories={categories} products={products} />
			</main>

		)
	}
}
