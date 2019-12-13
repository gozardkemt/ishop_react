import React from 'react';

export default class Content extends React.Component {

	render() {

		const {products, categories, activeCategoryId, onClick, card} = this.props;
		const contentStyle = {display:'grid', gridTemplateColumns: 'repeat(5, 1fr)', gridTemplateRows: 'repeat(3, min-content)'};

		let filteredProducts = products.filter(p => p.categoryId === activeCategoryId);
		if (activeCategoryId === '0') { filteredProducts = products };

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
		const productStyle = {border:'3px solid lightgray', margin:'10px', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems: 'center'}
		const imgStyle = {maxWidth:'100%', maxHeight:'100%', height:'min-content'}

		const {product, categories, onClick, card} = this.props;
		const {name, price, categoryId, thumbnail} = product;
		if (!thumbnail) {return null}

		return (
			<div key={name} className='product' style={productStyle}>
				<p className='name'>Model: {name} </p>
				<p className='price'>Cena: {price}€</p>
				< ProductCategory categoryId={categoryId} categories={categories}/>
				<img alt='foto' src={thumbnail} style={imgStyle}/>
				< Button card={card} product={product} onClick={onClick} />
			</div>
		)
	}
}

class ProductCategory extends React.Component {

	render() {

		const { categoryId:id, categories } = this.props;
		let category = categories.find( c => c.id === id );

		return (
			<p className={id}>
				Kategória produktu: { category.name }
			</p>
		)
	}
}

class Button extends React.Component {

	render() {

		const {name, price, thumbnail} = this.props.product;
		const {onClick, card} = this.props;
		let buttonText = 'Vložte do košíka';

		if (card.some(p => p.name === name)) {
			buttonText = 'Vložte ďalší kus do košíka';
		};

		return <button data-src={thumbnail} data-name={name} data-price={price} onClick={onClick} type='button'>{buttonText}</button>

	}
}
