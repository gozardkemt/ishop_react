import React from 'react';

export default class ShoppingCard extends React.Component {

	render() {

		const {shoppingCard, onClick, emptyShoppingCard, openForm} = this.props;

		if (shoppingCard.length < 1) { return null }

		const ulStyle = {
			fontSize:'0.85rem',
			listStyle: 'none',
			padding: 'unset'
		};

		const divStyle = {
			marginTop: '10px',
			backgroundColor: 'skyblue',
			width: '15rem',
			float:'right',
			position:'relative',
		}

		const h4Style = {
			margin:'unset',
			marginTop: '1rem',
			textAlign:'center'
		}

		return (
			 	<div style={divStyle}>
					<h4 style={h4Style}>Váš nákupný košík:</h4>
					<ul style = {ulStyle}>
						<ShoppingCardItem
							openForm={openForm}
							emptyShoppingCard={emptyShoppingCard}
							shoppingCard={shoppingCard}
							onClick={onClick}/>
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

		const buttonStyle = {
			width:'100%',
			padding:'.3rem'
		}

		const sum = (sum, i) => sum + parseInt(i.price * i.count);
		const {shoppingCard, onClick, emptyShoppingCard, openForm} = this.props;

		return (
			<>
				{shoppingCard.map(i =>
					<li key={i.name} style={liStyle}>
						<b style={margin}>{i.count}</b>
						<p>{i.name} Cena: {i.price * i.count}€</p>
						<b data-src={i.src} data-name={i.name} data-price={i.price * i.count} onClick={onClick} style={margin}>X</b>
					</li>
				)}
				<li style={margin}>Cena spolu: {shoppingCard.reduce(sum, 0)}€</li>
				<li style={margin} onClick={emptyShoppingCard}>Vyprázdniť košík</li>
				<li><button type='button' style={buttonStyle} onClick={openForm} >Objednať</button></li>
			</>
		)
	}
}
