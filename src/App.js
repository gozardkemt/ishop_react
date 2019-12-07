import React from 'react';
import './App.css';

class App extends React.Component {

	render() {

		  return (
		    <>
			  < Header />
			  < Selection categories={this.props.categories} />
			  < Content categories={this.props.categories} products={this.props.products} />
		    </>
		  );
  	}
}

export default App;

export class Header extends React.Component {

	render() {
		const headerStyle = { fontSize:'3em', width:'100%', textAlign: 'center', background: 'skyblue' };

		return (

			<header style={headerStyle}>
			  iStore Slovakia w/React
			</header>

		)
	}
}

export class Selection extends React.Component {

	render() {
		return (

			<select className='options'>
			  <option value='all' defaultValue>Všetky</option>
			  < Options categories={this.props.categories} />
			</select>

		)
	}
}

export class Options extends React.Component {

	render() {

		return (
			<>
			{
				this.props.categories.map( c =>
					<option key={c.id} value={c.name.toLowerCase()}>{c.name}</option>
				)
			}
			</>
		)
	}
}

export class Content extends React.Component {

	render() {
		const contentStyle = {	display:'grid', gridTemplateColumns:'repeat(3, 1fr)' };

		return (

			<main id='content' style={contentStyle} >
				< ProductItem categories={this.props.categories} products={this.props.products} />
			</main>

		)
	}
}

export class ProductItem extends React.Component {

	render() {

		let products = this.props.products;
		let categories = this.props.categories;
		const productStyle = { border:'10px solid rgba(90,90,90,0.3)', margin:'5px' }

		return (
			<>
				{
					products.map( p =>
							<div key={p.src} className='product' style={productStyle}>
								< ProductName key={p.name} name={p.name} />
								< ProductPrice key={p.price} price={p.price} />
								< ProductCategory key={p.src} categoryId={p.categoryId} categories={categories} />
								< ProductImg key={p.src} src={p.thumbnail} />
							</div>

					)
				}
			</>
		)
	}
}

export class ProductName extends React.Component {

	render() {

		return (

			<p className='name'>
				Model: {this.props.name}
			</p>

		)
	}
}

export class ProductPrice extends React.Component {

	render() {

		return (

			<p className='price'>
				Cena: {this.props.price} €
			</p>

		)
	}
}

export class ProductCategory extends React.Component {

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

export class ProductImg extends React.Component {

	render() {

		return (

			<img alt='foto' src={this.props.src}/>

		)
	}
}
