import React from 'react';
import PropTypes from 'prop-types';

export default class Content extends React.Component {

	render() {

		const {products, categories, activeCategoryId, onClick, card, priceRange, textQuery} = this.props;

		Content.propTypes = {
			products: PropTypes.array,
			categories: PropTypes.array,
			activeCategoryId: PropTypes.string,
			onClick: PropTypes.func,
			card: PropTypes.array,
			priceRange: PropTypes.array,
			textQuery: PropTypes.string,
		}

		const contentStyle = {
			display:'grid',
			gridTemplateColumns: 'repeat(5, 1fr)',
			gridTemplateRows: 'repeat(3, min-content)',
		};

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
			<main id='content' style={contentStyle} >
				{ filteredProducts.map( product =>
					< Product key={product.name} card={card} onClick={onClick} product={product} categories={categories} activeCategoryId={activeCategoryId} />
				)}
			</main>
		)
	}
}

class Product extends React.Component {

	render() {

		const {product, categories, onClick, card} = this.props;
		const {name, price, categoryId, thumbnail} = product;

		if (!thumbnail) {return null}

		const imgStyle = {maxWidth:'100%', maxHeight:'100%', height:'min-content'}

		return (
			< ProductWrapper>
				<strong className='name' dangerouslySetInnerHTML={{__html: name}}></strong>
				<span className='price'>Cena: {price}€</span>
				< ProductCategory categoryId={categoryId} categories={categories}/>
				<img alt='foto' src={thumbnail} style={imgStyle}/>
				< Button card={card} product={product} onClick={onClick} />
			< /ProductWrapper>
		)
	}
};

const ProductWrapper = (props) => {

	const productStyle = { border:'3px solid lightgray', margin:'10px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems: 'center' };

	return (
		<article className='product' style={productStyle}>
			{props.children}
		</article>
	)
}

const ProductCategory = ({categoryId:id, categories}) => {

	let category = categories.find(c => c.id === id);

	return (
		<p className={id}>
			Kategória produktu: { category.name }
		</p>
	)
}

class Button extends React.Component {

	render() {

		const {name, price, thumbnail} = this.props.product;
		const {onClick, card} = this.props;

		const buttonText = card.some(p => p.name === name) ? 'Vložte ďalší kus do košíka' : 'Vložte do košíka';

		return (
			<button data-src={thumbnail} data-name={name} data-price={price} onClick={onClick} type='button'>
				{buttonText}
			</button>
		)
	}
}
