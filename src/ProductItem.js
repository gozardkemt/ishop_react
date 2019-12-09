import React from 'react';

export default class ProductItem extends React.Component {

	render() {

		const productStyle = { border:'10px solid rgba(90,90,90,0.3)', margin:'5px' }
		const {products, categories, activeCategoryId} = this.props;
		let filteredProducts = products.filter(p => p.categoryId === activeCategoryId);
		if (activeCategoryId === '0') { filteredProducts = products };

		return (
			<>
			{
				filteredProducts.map( p =>
					<div className='product' style={productStyle}>
						< ProductName key={p.name} name={p.name} />
						< ProductPrice key={p.price} price={p.price} />
						< ProductCategory key={p.categoryId} categoryId={p.categoryId} categories={categories} />
						< ProductImg key={p.thumbnail} src={p.thumbnail} />
					</div>
				)
			}
			</>
		)
	}
}

class ProductName extends React.Component {

	render() {

		return (

			<p className='name'>
				Model: {this.props.name}
			</p>

		)
	}
}

class ProductPrice extends React.Component {

	render() {

		return (

			<p className='price'>
				Cena: {this.props.price}€
			</p>

		)
	}
}

class ProductCategory extends React.Component {

	render() {

		let id = this.props.categoryId;
		let categories = this.props.categories;
		let category = categories.filter( c => c.id === id );
		let categoryName = category[0].name;

		return (

			<p className={id}>
				Kategória produktu: { categoryName }
			</p>

		)
	}
}

class ProductImg extends React.Component {

	render() {

		return <img alt='foto' src={this.props.src}/>

	}
}
