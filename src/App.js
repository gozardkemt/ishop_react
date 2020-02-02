import React, {useState, useRef, useEffect} from 'react';
import { Header } from './Header.js';
import { Content } from './Content.js';
import { FilterBar } from './FilterBar.js';
import { ShoppingCard } from './ShoppingCard.js';
import { ShopForm } from './ShopForm.js';
import { ProductDetail } from './ProductDetail.js';
import { Router } from '@reach/router';
import { LanguageContext, translation } from './LanguageContext';
import { getIndexOfProduct, getTargetValue, getClickedProduct } from './appServices.js';

export const App = () =>  {

	const	[products, setProducts] = useState([]);
	const	[categories, setCategories] = useState([]),
	 		[isProductsLoading, setIsProductsLoading] = useState(true),
	 		[isCategoriesLoading, setIsCategoriesLoading] = useState(true),
	 		[isError, setIsError] = useState(false),
	 		[activeFilterBar, setActiveFilterBar] = useState(false),
	 		[priceRange, setPriceRange] = useState([0, Infinity]),
	 		[textQuery, setTextQuery] = useState(''),
	 		[activeCategoryId, setActiveCategoryId] = useState('0'),
	 		[activeShopForm, setActiveShopForm] = useState(false),
	 		[shoppingCard, setShoppingCard] = useState([]),
	 		[lang, setLang] = useState('sk');


	const minFilterRef = useRef(null);
	const maxFilterRef = useRef(null);
	const optionFilterRef = useRef(null);
	const setFilterQuery = e => setTextQuery(getTargetValue(e));

	const setMinPriceRange = e => setPriceRange([
		parseInt(getTargetValue(e)) || 0,
		priceRange[1]
	])

	const setMaxPriceRange = e => setPriceRange([
		priceRange[0],
		parseInt(getTargetValue(e)) || Infinity
	])

	const toggleFilterBar = () => setActiveFilterBar(!activeFilterBar);
	const changeActiveCategoryId = e => setActiveCategoryId(e.currentTarget.selectedOptions[0].id)

	const handleButtonClick = e => {
		const clicked = getClickedProduct(e);
		const index = getIndexOfProduct(clicked, shoppingCard);

		if (index !== -1) {
			increaseCount(index)
		} else {
			addItemToCard(clicked)
		}
	}

	const addItemToCard = clicked => setShoppingCard(shoppingCard.concat(clicked))

	const increaseCount = index => {
		setShoppingCard(shoppingCard.map((p,i) => {
			if (i === index) { p.count++ }
			return p
		}
	))
	}

	const handleRemoveClick = e => {

		const clicked = getClickedProduct(e);
		const index = getIndexOfProduct(clicked, shoppingCard);
		const count = shoppingCard[index].count;

		if (count < 2) {
			removeItemFromCard(clicked)
		} else {
			decreaseCount(index)
		}
	}

	const decreaseCount = index => {
		setShoppingCard(shoppingCard.map((p,i) => {
			if (i === index) { p.count-- }
			return p
		}
	))
	}

	const removeItemFromCard = clicked => {
		setShoppingCard(shoppingCard.filter((p) => p.name !== clicked.name || p.src !== clicked.src));
		setActiveShopForm(shoppingCard === [] ? activeShopForm : false)
	}

	const emptyShoppingCard = () => {
		setShoppingCard([]);
		setActiveShopForm(false)
	}

	const toggleForm = () => setActiveShopForm(!activeShopForm);

	const clearAllFilters = () => {

		optionFilterRef.current.value = 'all';
		minFilterRef.current.value = '';
		maxFilterRef.current.value = '';

		setPriceRange([0, Infinity]);
		setActiveCategoryId('0');
		setTextQuery('');
	}

	const changeLang = () => setLang(lang === 'sk' ? 'en' : 'sk')

	useEffect( () => {
		fetch("./data/categories.json")
			.then( res => res.json())
			.then(
				(res) => {
					setIsCategoriesLoading(false);
					setCategories(res);
				},
				(err) => {
					console.log(err)
					setIsCategoriesLoading(false);
					setIsError(true);
					}
				)

		fetch("./data/products.json")
			.then( res => res.json())
			.then(
				(res) => {
					setIsProductsLoading(false);
					setProducts(res);
				},
				(err) => {
					console.log(err)
					setIsProductsLoading(false);
					setIsError(true);
					}
 			)
	}, [])


		if ( isProductsLoading && isCategoriesLoading ) { return <span>loading... please wait</span> }
		if ( isError ) { return <span>We are sorry, there is a problem with your network</span> }

		return (
		    < LanguageContext.Provider value={translation[lang]}>
			  < Header
			  		onChange={toggleFilterBar}
					activeFilterBar={activeFilterBar}
					changeLang={changeLang}
			  		/>
			  < FilterBar
			  		activeFilterBar={activeFilterBar}
					onChange={changeActiveCategoryId}
					setPriceRange={{
						min: setMinPriceRange,
						max: setMaxPriceRange
					}}
					categories={categories}
					clearAllFilters={clearAllFilters}
					setTextQuery={setFilterQuery}
					textQuery={textQuery}
					setRefs={{
						min: minFilterRef,
						max: maxFilterRef,
						select: optionFilterRef
					}}
					/>
				< ShoppingCard
			  		emptyShoppingCard={emptyShoppingCard}
					shoppingCard={shoppingCard}
					onClick={handleRemoveClick}
					openForm={toggleForm}
					/>
				< ShopForm
			  		shoppingCard={shoppingCard}
					activeShopForm={activeShopForm}
					closeForm={toggleForm}
					/>
				< Router >
					< Content
				  		card={shoppingCard}
						priceRange={priceRange}
				  		onClick={handleButtonClick}
						activeCategoryId={activeCategoryId}
						categories={categories}
						products={products}
						textQuery={textQuery}
						path={"/"}
						/>
					< ProductDetail
						card={shoppingCard}
						onClick={handleButtonClick}
						path={"/product/:productId"}
						products={products}
						categories={categories}
						/>
				</ Router >
		    </ LanguageContext.Provider >
		)

}
