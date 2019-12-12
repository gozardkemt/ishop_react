import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Selection from './Selection.js';
import ShoppingCard from './ShoppingCard.js';
import './App.css';

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeCategoryId: '0',
			shoppingCard: []
		}
	}

	changeActiveCategoryId = e => {
		this.setState({
			activeCategoryId: e.currentTarget.selectedOptions[0].id
		})
	}

	findClickedProduct = e => {
		return {
			name: e.currentTarget.dataset.name,
			price: e.currentTarget.dataset.price,
		}
	}

	addItemToCard = e => {
		const itemToAdd = this.findClickedProduct(e)

		this.setState({
			shoppingCard: this.state.shoppingCard.concat(itemToAdd)
		}, () => console.log(this.state.shoppingCard))
	}

	removeItemFromCard = e => {
		const itemToRemove = this.findClickedProduct(e)

		this.setState({
			shoppingCard: this.state.shoppingCard.filter((p) => p.name !== itemToRemove.name && p.price !== itemToRemove.price)
		})
	}

	render() {
		const {products, categories} = this.props;
		const { activeCategoryId:id, shoppingCard:card } = this.state

		return (
		    <>
			  < Header />
			  < Selection onChange={this.changeActiveCategoryId} categories={categories} />
			  < ShoppingCard shoppingCard={card} onClick={this.removeItemFromCard} />
			  < Content onClick={this.addItemToCard} activeCategoryId={id} categories={categories} products={products} />
		    </>
		)
  	}
}
