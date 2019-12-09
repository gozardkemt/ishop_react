import React from 'react';
import Header from './Header.js';
import Content from './Content.js';
import './App.css';

export default class App extends React.Component {

	render() {
		  const {products, categories} = this.props;

		  return (
		    <>
			  < Header />
			  < Content categories={categories} products={products} />
		    </>
		  )
  	}
}
