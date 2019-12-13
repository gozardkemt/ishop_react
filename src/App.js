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

	getClickedProduct = e => {
		return {
			name: e.currentTarget.dataset.name,
			price: e.currentTarget.dataset.price,
			count: 1
		}
	}

	getIndexOfProduct = product => {
		const {shoppingCard} = this.state;

		const findProduct = (p) => {
			return p.name === product.name;
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
				state.shoppingCard.forEach( (p,i) => { if (i === index) { p.count++ } else return } )

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
				state.shoppingCard.forEach( (p,i) => { if (i === index) { p.count-- } else return } )

				return {
					shoppingCard: state.shoppingCard
				}
			}
		)
	}

	removeItemFromCard = clicked => {
		this.setState({
			shoppingCard: this.state.shoppingCard.filter((p) => p.name !== clicked.name && p.price !== clicked.price)
		})
	}

	render() {
		const {products, categories} = this.props;
		const {activeCategoryId:id, shoppingCard:card} = this.state;
		const {changeActiveCategoryId, handleRemoveClick, handleButtonClick} = this;

		return (
		    <>
			  < Header />
			  < Selection onChange={changeActiveCategoryId} categories={categories} />
			  < ShoppingCard shoppingCard={card} onClick={handleRemoveClick} />
			  < Content card={card} onClick={handleButtonClick} activeCategoryId={id} categories={categories} products={products} />
		    </>
		)
  	}
}
