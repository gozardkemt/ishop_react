import React from 'react';
import './App.css';

function App(props) {

  return (
    <>
	  < Header />
	  < Selection categories={props.categories} />
	  < Content categories={props.categories} products={props.products} />
    </>
  );
}

export default App;

export function Header() {

	const headerStyle = { fontSize:'3em', width:'100%', textAlign: 'center', background: 'skyblue' };

	return (

		<header style={headerStyle}>
		  iStore Slovakia w/React
		</header>

	)
}

export function Selection(props) {

	return (

		<select className='options'>
		  <option value='all' defaultValue>Všetky</option>
		  < Options categories={props.categories} />
		</select>

	)
}

export function Options(props) {

	return (
		<>
		{
			props.categories.map( c => <option key={c.id} value={c.name.toLowerCase()}>{c.name}</option> )
		}
		</>
	)
}

export function Content(props) {

	const contentStyle = {	display:'grid', gridTemplateColumns:'repeat(3, 1fr)' };

	return (

		<main id='content' style={contentStyle} >
			< ProductItem categories={props.categories} products={props.products} />
		</main>

	)
}

export function ProductItem(props) {

	let products = props.products;
	const productStyle = { border:'10px solid rgba(90,90,90,0.3)', margin:'5px' }

	return (
		<>
			{
				products.map( p =>
						<div key={p.src} className='product' style={productStyle}>
							< ProductName key={p.name} name={p.name} />
							< ProductPrice key={p.price} price={p.price} />
							< ProductCategory key={p.src} categoryId={p.categoryId} categories={props.categories} />
							< ProductImg key={p.src} src={p.thumbnail} />
						</div>

				)
			}
		</>
	)
}

export function ProductName(props) {

	return (

		<p className='name'>
			Model: {props.name}
		</p>

	)
}

export function ProductPrice(props) {

	return (

		<p className='price'>
			Cena: {props.price} €
		</p>

	)
}

export function ProductCategory(props) {

	let id = props.categoryId;
	let categories = props.categories;
	let category = categories.filter( c => c.id === id );
	let categoryName = category[0].name;

	return (

		<p className={id}>
			Kategória produktu: { categoryName }
		</p>

	)
}

export function ProductImg(props) {

	return (

		<img alt='foto' src={props.src}/>

	)
}
