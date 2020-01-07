import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {products, categories} from './data.js';


ReactDOM.render(<App products={products} categories={categories}  />, document.getElementById('root'));
