import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import Selection from './Selection.js';
import './App.css';

export default class App extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			activeCategoryId: '0'
		}
	}

	changeActiveCategoryId = e => {

		this.setState({
			activeCategoryId: e.currentTarget.selectedOptions[0].id
		})
	}

	render() {
		  const {products, categories, } = this.props;
		  const {activeCategoryId} = this.state;

		  return (
		    <>
			  < Header />
			  < Selection onChange={this.changeActiveCategoryId} categories={categories} />
			  < Content activeCategoryId={activeCategoryId} categories={categories} products={products} />
		    </>
		  )
  	}
}
