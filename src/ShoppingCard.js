import React from 'react';

export default class ShoppingCard extends React.Component {

	render() {

		const {shoppingCard, onClick, emptyShoppingCard} = this.props;

		const ulStyle = {
			fontSize:'0.85rem',
			listStyle: 'none',
			padding: 'unset'
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
						<ShoppingCardItem emptyShoppingCard={emptyShoppingCard} shoppingCard={shoppingCard} onClick={onClick}/>
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
			width: '13rem',
		}

		const margin = {
			margin: '1rem'
		}

		const handleSum = (sum, i) => sum + parseInt(i.price * i.count);
		const {shoppingCard, onClick, emptyShoppingCard} = this.props;

		return (
			<>
				{shoppingCard.map(i =>
					<li key={i.name} style={liStyle}>
						<b style={margin}>{i.count}</b>
						<p>{i.name} Cena: {i.price * i.count}€</p>
						<span data-name={i.name} data-price={i.price * i.count} onClick={onClick} style={margin} >X</span>
					</li>
				)}
				<li style={margin}>Cena spolu: {shoppingCard.reduce(handleSum, 0)}€</li>
				<li style={margin} onClick={emptyShoppingCard}>Vyprázdniť košík</li>
			</>
		)
	}
}
