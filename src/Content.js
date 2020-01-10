import React from 'react';
import PropTypes from 'prop-types';

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
		const {name, price, categoryId, thumbnail} = product;

		if (!thumbnail) {return null}

		return (
			< ProductWrapper>
				< ProductName name={name} />
				< ProductPrice price={price} />
				< ProductCategory categoryId={categoryId} categories={categories} />
				< ProductImg src={thumbnail} />
				< Button card={card} product={product} onClick={onClick} />
			</ ProductWrapper>
		)
	}
}

// dumb components

const ProductName = props => <strong className='name' dangerouslySetInnerHTML={{__html: props.name}}></strong>
const ProductPrice = props => <span className='price'>Cena: {props.price}€</span>

const imgStyle = { maxWidth:'100%', maxHeight:'100%', height:'min-content' }
const ProductImg = props => <img alt='foto' src={props.src} style={imgStyle}/>

const ProductCategory = ({categoryId:id, categories}) => {

	let category = categories.find(c => c.id === id);

	return (
		<p className={id}>
			Kategória produktu: { category.name }
		</p>
	)
}

const Button = ({onClick, card, product:{name, price, thumbnail}}) => {

		const buttonText = card.some(p => p.name === name) ? 'Vložte ďalší kus do košíka' : 'Vložte do košíka';

		return (
			<button data-src={thumbnail} data-name={name} data-price={price} onClick={onClick} type='button'>
				{buttonText}
			</button>
		)
}

// wrappers

const ContentWrapper = (props) => {

	const contentStyle = {
		display:'grid',
		gridTemplateColumns: 'repeat(5, 1fr)',
		gridTemplateRows: 'repeat(3, min-content)',
	};

	return (
		<main id='content' style={contentStyle} >
			{props.children}
		</main>
	)
}

const ProductWrapper = (props) => {

	const productStyle = {
		border:'3px solid lightgray',
		margin:'10px',
		display:'flex',
		flexDirection:'column',
		justifyContent:'space-between',
		alignItems: 'center'
	};

	return (
		<article className='product' style={productStyle}>
			{props.children}
		</article>
	)
}
