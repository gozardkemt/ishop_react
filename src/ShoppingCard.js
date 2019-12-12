import React from 'react';

export default class ShoppingCard extends React.Component {

	render() {

		const {shoppingCard, onClick} = this.props;

		const ulStyle = {
			fontSize:'0.85rem',
			listStyle: 'none'
		};

		const divStyle = {
			backgroundColor: 'skyblue',
			width: '15rem',
			float:'right',
			position:'relative',
			top: '-2.5rem'
		}

		if (shoppingCard.length < 1) { return null }

		return (
			 	<div style={divStyle}>
					<h4 style={{margin:'unset', textAlign:'center'}}>Váš nákupný košík:</h4>
					<ul style = {ulStyle}>
						<ShoppingCardItem shoppingCard={shoppingCard} onClick={onClick}/>
					</ul>
				</div>
		)
	}
}


class ShoppingCardItem extends React.Component {

	render() {

		const liStyle = {
			display: 'flex',
			alignItems: 'center',
			width: '10rem',
		}

		const {shoppingCard:card, onClick} = this.props;
		const handleSum = (sum, i) => sum + parseInt(i.price);

		return (
			<>
				{card.map(i =>
					<li style={liStyle}>
						<p>{i.name} Cena: {i.price}€</p>
						<span data-name={i.name} data-price={i.price} onClick={onClick}>X</span>
					</li>
				)}
				<li>Cena spolu: {card.reduce(handleSum, 0)}€</li>
			</>
		)
	}
}
