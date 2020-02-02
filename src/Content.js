import React from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper, ProductWrapper } from './StyleWrappers.js';
import { ProductPrice, ProductCategory, ProductImg, Button } from './ProductDetail.js';
import { Link } from '@reach/router'

export const Content = ({products, categories, activeCategoryId, onClick, card, priceRange, textQuery}) => {

	const filteredProducts = products
		.filter(p => priceRange[0] <= p.price && p.price <= priceRange[1])
		.filter(p => p.name.toLowerCase().includes(textQuery.toLowerCase()))
		.filter(p => {
			if ( activeCategoryId === '0' ) { return true }
			return p.categoryId === activeCategoryId}
		);

	if (filteredProducts.length < 1) {

		return  (
			<div style={{textAlign:'center'}}>
				<h3>Podmienky bohužial nespĺňa žiadny produkt</h3>
			</div>
		);
	}

	return (
		<ContentWrapper>
			{ filteredProducts.map( product =>
				< Product key={product.name}
					card={card}
					onClick={onClick}
					product={product}
					categories={categories}
					activeCategoryId={activeCategoryId} />
			)}
		</ContentWrapper>
	)

}

Content.propTypes = {
	products: PropTypes.array,
	categories: PropTypes.array,
	activeCategoryId: PropTypes.string,
	onClick: PropTypes.func,
	card: PropTypes.array,
	priceRange: PropTypes.array,
	textQuery: PropTypes.string,
}

const Product = ({ product, categories, onClick, card}) => {

	const { name, price, categoryId, thumbnail, productId } = product;
	if (!thumbnail) {return null}

	return (
		< ProductWrapper>
			< Link className='name' to={'product/' + productId} >{name}</Link>
			< ProductPrice price={price} />
			< ProductCategory categoryId={categoryId} categories={categories} />
			< ProductImg src={thumbnail} />
			< Button card={card} product={product} onClick={onClick} />
		</ ProductWrapper>
	)

}
