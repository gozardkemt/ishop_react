import React from 'react';
import PropTypes from 'prop-types';
import { ContentWrapper, ProductWrapper } from './StyleWrappers.js';
import { ProductPrice, ProductCategory, ProductImg, Button } from './ProductDetail.js';
import { Link } from '@reach/router'

export default class Content extends React.Component {

	render() {

		const {products, categories, activeCategoryId, onClick, card, priceRange, textQuery} = this.props;

		const filterByPrice = products.filter(p => priceRange[0] <= p.price && p.price <= priceRange[1]);
		const filterByText = filterByPrice.filter(p => p.name.toLowerCase().includes(textQuery.toLowerCase()));
		const filteredProducts = activeCategoryId === '0' ? filterByText : filterByText.filter(p => p.categoryId === activeCategoryId);

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

class Product extends React.Component {

	render() {

		const {product, categories, onClick, card} = this.props;
		const {name, price, categoryId, thumbnail, productId} = product;

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
}
