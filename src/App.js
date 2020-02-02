import React from 'react';
import Header from './Header.js';
<<<<<<< HEAD
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
=======
import Content from './Content.js';
import FilterBar from './FilterBar.js';
import ShoppingCard from './ShoppingCard.js';
import ShopForm from './ShopForm.js';
import ProductDetail from './ProductDetail.js';
import { Router } from '@reach/router';
import { LanguageContext, translation } from './LanguageContext';
import { getIndexOfProduct, getTargetValue, getClickedProduct } from './appServices.js';

const defaultState = {

	// fetch data
	products: [],
	categories: [],

	// data loading
	isProductsLoading: true,
	isCategoriesLoading: true,
	isError: false,

	// user filter interaction
	activeFilterBar: false,
	priceRange: [0, Infinity],
	textQuery: '',
	activeCategoryId: '0',

	// user buying interaction
	activeShopForm: false,
	shoppingCard: [],

	// others
	lang: 'sk'
}

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.minFilterRef = React.createRef();
		this.maxFilterRef = React.createRef();
		this.optionFilterRef = React.createRef();

		this.state = defaultState;
	}

	setTextQuery = e => { this.setState({ textQuery: getTargetValue(e) }) }

	setMinPriceRange = e => {
		this.setState({
			priceRange: [
				parseInt(getTargetValue(e)) || 0,
				this.state.priceRange[1]
			]
		})
	}

	setMaxPriceRange = e => {
		this.setState({
			priceRange: [
				this.state.priceRange[0],
				parseInt(getTargetValue(e)) || Infinity
			]
		})
	}

	toggleFilterBar = () => {
		this.setState({
			activeFilterBar: !this.state.activeFilterBar,
		})
	}

	changeActiveCategoryId = e => {
		this.setState({
			activeCategoryId: e.currentTarget.selectedOptions[0].id
		})
	}

	handleButtonClick = e => {
		const clicked = getClickedProduct(e);
		const index = getIndexOfProduct(clicked, this.state.shoppingCard);

		if (index !== -1) {
			this.increaseCount(index)
		} else {
			this.addItemToCard(clicked)
		}
	}

	addItemToCard = clicked => {
		this.setState({
			shoppingCard: this.state.shoppingCard.concat(clicked)
		})
	}

	increaseCount = index => {
		this.setState(
			state => {
				state.shoppingCard.forEach((p,i) => { if (i === index) { p.count++ } else return })

				return {
					shoppingCard: state.shoppingCard
				}
>>>>>>> classed
			}
		)
	}

	handleRemoveClick = e => {

		const card = this.state.shoppingCard;
		const clicked = getClickedProduct(e);
		const index = getIndexOfProduct(clicked, card);
		const count = card[index].count;

		if (count < 2) {
			this.removeItemFromCard(clicked)
		} else {
			this.decreaseCount(index)
		}
	}

	decreaseCount = index => {
		this.setState(
			state => {
				state.shoppingCard.forEach((p,i) => {if (i === index) { p.count-- } else return })

				return {
					shoppingCard: state.shoppingCard
				}
			}
		)
	}

	removeItemFromCard = clicked => {
		this.setState({
			shoppingCard: this.state.shoppingCard.filter((p) => p.name !== clicked.name || p.src !== clicked.src),
			activeShopForm: this.state.shoppingCard === [] ? this.state.activeShopForm : false
		})
	}

	emptyShoppingCard = () => {
		this.setState({
			shoppingCard: [],
			activeShopForm: false
		})
	}

	toggleForm = () => {
		this.setState({
			activeShopForm: !this.state.activeShopForm
		})
	}

	clearAllFilters = () => {

		this.optionFilterRef.current.value = 'all';
		this.minFilterRef.current.value = '';
		this.maxFilterRef.current.value = '';

		this.setState({
			priceRange: [0, Infinity],
			activeCategoryId: '0',
			textQuery: ''
		})
	}

	changeLang = () => {

		this.setState({
			lang: this.state.lang === 'sk' ? 'en' : 'sk'
		})
	}

	componentDidMount() {

		fetch("http://localhost:8080/categories.json")
			.then( res => res.json())
			.then(
				(res) => {
					this.setState({
						isCategoriesLoading: false,
						categories: res
					})
				},
				(err) => {
					console.log(err);
					this.setState({
						isLoading: false,
						isError: true
					})
				}
 			)

		fetch("http://localhost:8080/products.json")
			.then( res => res.json())
			.then(
				(res) => {
					this.setState({
						isLoading: false,
						products: res
					})
				},
				(err) => {
					console.log(err);
					this.setState({
						isProductsLoading: false,
						isError: true
					})
				}
 			)
	}

	render() {

		const {
			products,
			categories,
			isError,
			isCategoriesLoading,
			isProductsLoading,
			activeCategoryId:id,
			shoppingCard:card,
			activeShopForm:form,
			activeFilterBar:filter,
			priceRange:range,
			textQuery,
			lang
		} = this.state;

		const {
			changeActiveCategoryId,
			handleRemoveClick,
			handleButtonClick,
			emptyShoppingCard,
			toggleForm,
			toggleFilterBar,
			setMaxPriceRange,
			setMinPriceRange,
			clearAllFilters,
			setTextQuery,
			minFilterRef,
			maxFilterRef,
			optionFilterRef,
			changeLang
		} = this;


		if ( isProductsLoading && isCategoriesLoading ) { return <span>loading... please wait</span> }
		if ( isError ) { return <span>We are sorry, there is a problem with your network</span> }

		return (
		    < LanguageContext.Provider value={translation[lang]}>
			  < Header
			  		onChange={toggleFilterBar}
					activeFilterBar={filter}
					changeLang={changeLang}
			  		/>
			  < FilterBar
			  		activeFilterBar={filter}
					onChange={changeActiveCategoryId}
					setPriceRange={{
						min: setMinPriceRange,
						max: setMaxPriceRange
					}}
					categories={categories}
					clearAllFilters={clearAllFilters}
					setTextQuery={setTextQuery}
					textQuery={textQuery}
					setRefs={{
						min: minFilterRef,
						max: maxFilterRef,
						select: optionFilterRef
					}}
					/>
				< ShoppingCard
			  		emptyShoppingCard={emptyShoppingCard}
					shoppingCard={card}
					onClick={handleRemoveClick}
					openForm={toggleForm}
					/>
				< ShopForm
			  		shoppingCard={card}
					activeShopForm={form}
					closeForm={toggleForm}
					/>
				< Router >
					< Content
				  		card={card}
						priceRange={range}
				  		onClick={handleButtonClick}
						activeCategoryId={id}
						categories={categories}
						products={products}
						textQuery={textQuery}
						path={"/"}
						/>
					< ProductDetail
						card={card}
						onClick={handleButtonClick}
						path={"/product/:productId"}
						products={products}
						categories={categories}
						/>
				</ Router >
		    </ LanguageContext.Provider >
		)
  	}
}
