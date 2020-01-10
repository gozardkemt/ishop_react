import React from 'react';
import PropTypes from 'prop-types';
import {sum} from './appServices.js';

export default class ShoppingCard extends React.Component {

	render() {

		const {shoppingCard, onClick, emptyShoppingCard, openForm} = this.props;

		if ( shoppingCard.length < 1 ) { return null }

		return (
				< ShopCardWrapper>
					< ShopCardName />
					< ShopListWrapper>
						<ShoppingCardItems
							openForm={openForm}
							emptyShoppingCard={emptyShoppingCard}
							shoppingCard={shoppingCard}
							onClick={onClick}/>
					</ ShopListWrapper>
				</ ShopCardWrapper>
		)
	}
}

ShoppingCard.propTypes = {
	shoppingCard: PropTypes.array,
	onClick: PropTypes.func,
	emptyShoppingCard: PropTypes.func,
	openForm: PropTypes.func
}

class ShoppingCardItems extends React.Component {

	render() {


		const {shoppingCard, onClick, emptyShoppingCard, openForm} = this.props;

		return (
			<>
				{shoppingCard.map(i => < ShoppingCardItem item={i} onClick={onClick} key={i.name} /> )}
				< ShoppingCardPriceAll shoppingCard={shoppingCard} />
				< ShoppingCardEmptyAll emptyShoppingCard={emptyShoppingCard} />
				< ShoppingCardOrderAll openForm={openForm} />
			</>
		)
	}
}

class ShoppingCardItem extends React.Component {

	render() {

		const { item:i, onClick } = this.props

		return (
			< ShopCardProductWrapper>
				< ShopCardProductCount item={i}/>
				< ShopCardProductPrice item={i}/>
				< ShopCardProductClose item={i} onClick={onClick}/>
			</ ShopCardProductWrapper>
		)
	}
}

// style wrappers

const ShopCardProductWrapper = (props) => {

	const liStyle = {
		display: 'flex',
		alignItems: 'center',
		width: '13rem',
	}

	return (
		<li style={liStyle}>
			{props.children}
		</li>
	)

}

const ShopCardWrapper = (props) => {

	const divStyle = {
		marginTop: '10px',
		backgroundColor: 'skyblue',
		width: '15rem',
		float:'right',
		position:'relative',
	}

	return (
		<div style={divStyle}>
			{props.children}
		</div>
	)

}

const ShopListWrapper = (props) => {

	const ulStyle = {
		fontSize:'0.85rem',
		listStyle: 'none',
		padding: 'unset'
	};

	return (
		<ul style = {ulStyle}>
			{props.children}
		</ul>
	)

}

//  dumb components

const ShopCardName = () => <h4 style={shopCardNameStyle}>Váš nákupný košík:</h4>

const ShopCardProductCount = ({item}) => <b style={{margin: '1rem'}}>{item.count}</b>
const ShopCardProductPrice = ({item:i}) => <p>{i.name} Cena: {i.price * i.count}€</p>
const ShopCardProductClose = ({item:i, onClick:fn}) => <b data-src={i.src} data-name={i.name} data-price={i.price * i.count} onClick={fn} style={{margin: '1rem'}}>X</b>

const ShoppingCardPriceAll = ({shoppingCard}) => <li style={{margin: '1rem'}}>Cena spolu: {shoppingCard.reduce(sum, 0)}€</li>
const ShoppingCardEmptyAll = ({emptyShoppingCard}) => <li style={{margin: '1rem'}} onClick={emptyShoppingCard}>Vyprázdniť košík</li>
const ShoppingCardOrderAll = ({openForm}) => <li><button type='button' style={shoppingCardOrderAllStyle} onClick={openForm} >Objednať</button></li>

const shoppingCardOrderAllStyle = {
	width:'100%',
	padding:'.3rem'
}

const shopCardNameStyle = {
	margin:'unset',
	marginTop: '1rem',
	textAlign:'center'
}
