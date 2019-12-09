import React from 'react';
import ProductItem from './ProductItem.js';

export default class Content extends React.Component {

	render() {

		const contentStyle = {	display:'grid', gridTemplateColumns: 'repeat(3, 1fr)' };
		const { products, categories, activeCategoryId } = this.props;

		return (
			<>
				<main id='content' style={contentStyle} >
					< ProductItem activeCategoryId={activeCategoryId} categories={categories} products={products} />
				</main>
			</>
		)
	}
}
