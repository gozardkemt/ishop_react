import React from 'react';

export const ContentWrapper = (props) => {

	const contentStyle = {
		display:'grid',
		gridTemplateColumns: 'repeat(5, 1fr)',
		gridTemplateRows: 'repeat(3, min-content)',
	};

	return (
		<main id='content' style={contentStyle} >
			{props.children}
		</main>
	)
}

export const ProductWrapper = (props) => {

	const productStyle = {
		border:'3px solid lightgray',
		margin:'10px',
		display:'flex',
		flexDirection:'column',
		justifyContent:'space-between',
		alignItems: 'center'
	};

	return (
		<article className='product' style={productStyle}>
			{props.children}
		</article>
	)
}

export const SectionWrapper = (props) => {

	const sectionStyle = {
		width:'100%',
		textAlign: 'left',
		background: 'skyblue',
		marginTop: '0.5rem'
	}

	return (
		<section style={sectionStyle}>
			{props.children}
		</section>
	)

}

export const ShopCardProductWrapper = (props) => {

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

export const ShopCardWrapper = (props) => {

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

export const ShopListWrapper = (props) => {

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

const formStyle = {
	height:'50%',
	width: '50%',
	backgroundColor:'skyblue',
	position: 'absolute',
	top:'25%',
	left:'25%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	alignItems: 'center'
}

export const FormStyleWrapper = (props) => <form style={formStyle}>{props.children}</form>
