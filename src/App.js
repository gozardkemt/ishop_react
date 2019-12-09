import React from 'react';
import Header from './Header.js';
import './App.css';

function App(props) {

  return (
    <>
	  < Header />
	  < Content categories={props.categories} products={props.products} />
    </>
  );
}

export default App;


export function Options(props) {

	return (
		<>
		{
			props.categories.map( c => <option id={c.id} value={c.name.toLowerCase()}>{c.name}</option> )
		}
		</>
	)
}


let activeCategoryId = '0';

function changeActiveCategory(e) {
	activeCategoryId = e.target.selectedOptions[0].id
}

export function Content(props) {

	const contentStyle = {	display:'grid', gridTemplateColumns:'repeat(3, 1fr)' };
	const { categories, products } = props;

	return (
		<>
			<select onChange={changeActiveCategory} className='options'>
			  <option id='0' value='all' defaultValue>Všetky</option>
			  < Options categories={categories} />
			</select>
			<main id='content' style={contentStyle} >
				< ProductItem activeCategoryId={activeCategoryId} categories={categories} products={products} />
			</main>
		</>
	)
}

export function ProductItem(props) {

	const { products, categories, activeCategoryId } = props;
	const productStyle = { border:'10px solid rgba(90,90,90,0.3)', margin:'5px' };
	let filteredProducts = products.filter(p => activeCategoryId === p.categoryId);
	if (activeCategoryId === '0') { filteredProducts = products };

	return (
		<>
			{
				filteredProducts.map( p =>
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
