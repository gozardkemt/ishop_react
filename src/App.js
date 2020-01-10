import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import FilterBar from './FilterBar.js';
import ShoppingCard from './ShoppingCard.js';
import ShopForm from './ShopForm.js';
import {getIndexOfProduct, getTargetValue, getClickedProduct} from './appServices.js';

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
		const {
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
