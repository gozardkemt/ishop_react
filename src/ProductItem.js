import React from 'react';

export default class ProductItem extends React.Component {

	render() {

		const {products, categories, activeCategoryId} = this.props;

		let filteredProducts = products.filter(p => p.categoryId === activeCategoryId);
		if (activeCategoryId === '0') { filteredProducts = products };

		if (filteredProducts.length < 1) {

			return  (
				<div>
					<h3>Podmienky bohužial nespĺňa žiadny produkt</h3>
				</div>
			);
		}

		return (
			filteredProducts.map( product =>
				< Product product={product} categories={categories} activeCategoryId={activeCategoryId} />
			)

		)
	}
}

class Product extends React.Component {

	render() {
		const productStyle = { border:'10px solid rgba(90,90,90,0.3)', margin:'5px' }
		const imgStyle = { maxWidth:'100%', maxHeight:'100%', height:'min-content', width:'auto' }

		const {product, categories} = this.props;
		const {name, price, categoryId, thumbnail} = product;
		if (!thumbnail) {return null}

		return (
			<div key={name} className='product' style={productStyle}>
				<p className='name'>Model: {name} </p>
				<p className='price'>Cena: {price}€</p>
				< ProductCategory categoryId={categoryId} categories={categories}/>
				<img alt='foto' src={thumbnail} style={imgStyle}/>
			</div>
		)
	}
}

class ProductCategory extends React.Component {

	render() {

		const { categoryId:id , categories } = this.props;
		let category = categories.find( c => c.id === id );
		const categoryName = category.name;

		return (
			<p className={id}>
				Kategória produktu: { categoryName }
			</p>
		)
	}
}
