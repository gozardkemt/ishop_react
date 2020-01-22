import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import FilterBar from './FilterBar.js';
import ShoppingCard from './ShoppingCard.js';
import ShopForm from './ShopForm.js';
import ProductDetail from './ProductDetail.js';
import { Router } from '@reach/router'
import { getIndexOfProduct, getTargetValue, getClickedProduct } from './appServices.js';

const defaultState = {

	products: [],
	categories: [],
	isProductsLoading: true,
	isCategoriesLoading: true,
	isError: false,
	activeShopForm: false,
	activeFilterBar: false,
	priceRange: [0, Infinity],
	textQuery: '',
	activeCategoryId: '0',
	shoppingCard: []

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

	componentDidMount() {

		fetch("http://localhost:8081/categories.json")
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

		fetch("http://localhost:8081/products.json")
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
			isCategoriesLoading,
			isProductsLoading,
			activeCategoryId:id,
			shoppingCard:card,
			activeShopForm:form,
			activeFilterBar:filter,
			priceRange:range,
			textQuery
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
			optionFilterRef
		} = this;

		if ( isProductsLoading && isCategoriesLoading ) { return <span> loading... please wait </span> }

		return (
		    <>
			  < Header
			  		onChange={toggleFilterBar}
					activeFilterBar={filter}
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
		    </>
		)
  	}
}
