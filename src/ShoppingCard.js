import React from 'react';
import PropTypes from 'prop-types';
import { ShopCardWrapper, ShopListWrapper, ShopCardProductWrapper } from './StyleWrappers.js';
import { sum } from './appServices.js';

export default class ShoppingCard extends React.Component {

	render() {

		const {shoppingCard, onClick, emptyShoppingCard, openForm} = this.props;

		if ( shoppingCard.length < 1 ) { return null }

		return (
				< ShopCardWrapper>
					< ShopCardName />
					< ShopListWrapper >
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

const ShopCardName = () => <h4 style={shopCardNameStyle}>Váš nákupný košík:</h4>

const shopCardNameStyle = {
	margin:'unset',
	marginTop: '1rem',
	textAlign:'center'
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

const ShoppingCardPriceAll = ({shoppingCard}) => <li style={{margin: '1rem'}}>Cena spolu: {shoppingCard.reduce(sum, 0)}€</li>
const ShoppingCardEmptyAll = ({emptyShoppingCard}) => <li style={{margin: '1rem'}} onClick={emptyShoppingCard}>Vyprázdniť košík</li>
const ShoppingCardOrderAll = ({openForm}) => <li><button type='button' style={shoppingCardOrderAllStyle} onClick={openForm} >Objednať</button></li>

const shoppingCardOrderAllStyle = {
	width:'100%',
	padding:'.3rem'
}


class ShoppingCardItem extends React.Component {

	render() {

		const { item, onClick } = this.props;

		return (
			< ShopCardProductWrapper>
				< ShopCardProductCount i={item}/>
				< ShopCardProductPrice i={item}/>
				< ShopCardProductClose i={item} onClick={onClick}/>
			</ ShopCardProductWrapper>
		)
	}
}

const ShopCardProductCount = ({i}) => <b style={{margin: '1rem'}}>{i.count}</b>
const ShopCardProductPrice = ({i}) => <p>{i.name} Cena: {i.price * i.count}€</p>
const ShopCardProductClose = ({i, onClick:fn}) => <b data-src={i.src} data-name={i.name} data-price={i.price * i.count} onClick={fn} style={{margin: '1rem'}}>X</b>
