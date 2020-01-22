import React from 'react';
import { Link } from '@reach/router';
import { getProductFromId, getCategoryNamefromCategoryId } from './appServices.js';
import { ProductWrapper } from './StyleWrappers.js';

export default class ProductDetail extends React.Component {

	render() {

		const { productId, products, categories, onClick, card } = this.props;
		const product = getProductFromId(productId, products);
		const { thumbnail:src, price, name, categoryId } = product;

		return 	(
			< ProductWrapper>
				<strong>{name}</strong>
				< ProductPrice price={price}/>
				< ProductCategory categoryId={categoryId} categories={categories} />
				< ProductImg src={src} />
				< Button card={card} onClick={onClick} product={product}/>
				< Link to="/" style={{marginLeft:'auto', padding: '1rem'}}>Späť</Link>
			</ ProductWrapper>
		)
	}
}

export const ProductPrice = props => <span className='price'>Cena: {props.price}€</span>

export const ProductImg = props => {

	const imgStyle = { maxWidth:'100%', maxHeight:'100%', height:'min-content'}
	return <img alt='foto' src={props.src} style={imgStyle}/>

}

export const ProductCategory = ({categoryId:id, categories}) => {

	return (
		<p className={id}>
			Kategória produktu: {getCategoryNamefromCategoryId(id, categories)}
		</p>
	)
}

export const Button = ({onClick, card, product:{name, price, thumbnail}}) => {

	const buttonText = card.some(p => p.name === name) ? 'Vložte ďalší kus do košíka' : 'Vložte do košíka';

	return (
		<button data-src={thumbnail} data-name={name} data-price={price} onClick={onClick} type='button'>
			{buttonText}
		</button>
	)
}
