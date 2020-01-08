import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import FilterBar from './FilterBar.js';
import ShoppingCard from './ShoppingCard.js';
import ShopForm from './ShopForm.js';

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeShopForm: false,
			activeFilterBar: false,
			priceRange: [0, Infinity],
			textQuery: '',
			activeCategoryId: '0',
			shoppingCard: []
		}
	}

	setTextQuery = e => {
		this.setState({
			textQuery: e.currentTarget.value,
		})
	}

	setMinPriceRange = e => {
		this.setState({
			priceRange: [
				parseInt(e.currentTarget.value) || 0,
				this.state.priceRange[1]
			]
		})
	}

	setMaxPriceRange = e => {
		this.setState({
			priceRange: [
				this.state.priceRange[0],
				parseInt(e.currentTarget.value) || Infinity
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

	getClickedProduct = e => {
		return {
			name: e.currentTarget.dataset.name,
			price: e.currentTarget.dataset.price,
			src: e.currentTarget.dataset.src,
			count: 1
		}
	}

	getIndexOfProduct = product => {
		const {shoppingCard} = this.state;

		const findProduct = (p) => {
			return (p.name === product.name) && (p.src === product.src);
		}

		return shoppingCard.findIndex(findProduct);
	}

	handleButtonClick = e => {
		const clicked = this.getClickedProduct(e);
		const index = this.getIndexOfProduct(clicked);

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
		const clicked = this.getClickedProduct(e);
		const index = this.getIndexOfProduct(clicked);
		const count = this.state.shoppingCard[index].count;

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

		const d = document;
		d.getElementById('minFilter').value = '';
		d.getElementById('maxFilter').value = '';
		d.getElementsByClassName('options')[0].value= 'all';

		this.setState({
			priceRange: [0, Infinity],
			activeCategoryId: '0',
			textQuery: ''
		})
	}

	render() {
		const {products, categories} = this.props;
		const {activeCategoryId:id, shoppingCard:card, activeShopForm:form, activeFilterBar:filter, priceRange:range, textQuery} = this.state;
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
			setTextQuery
		} = this;

		return (
		    <>
			  < Header
			  		onChange={toggleFilterBar}
					activeFilterBar={filter}
			  	/>
			  < FilterBar
			  		activeFilterBar={filter}
					onChange={changeActiveCategoryId}
					setPriceRange={{ min: setMinPriceRange, max:setMaxPriceRange}}
					categories={categories}
					clearAllFilters={clearAllFilters}
					setTextQuery={setTextQuery}
					textQuery={textQuery}
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
			  < Content
			  		card={card}
					priceRange={range}
			  		onClick={handleButtonClick}
					activeCategoryId={id}
					categories={categories}
					products={products}
					textQuery={textQuery}
				/>
		    </>
		)
  	}
}
