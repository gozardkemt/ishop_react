
export const getTargetValue = e => e.currentTarget.value
export const sum = (sum, i) => sum + parseInt(i.price * i.count);

export const getClickedProduct = e => {
	return {
		name: e.currentTarget.dataset.name,
		price: e.currentTarget.dataset.price,
		src: e.currentTarget.dataset.src,
		count: 1
	}
}

export const getIndexOfProduct = (product, shoppingCard) => {
	const found = (p) => (p.name === product.name) && (p.src === product.src);
	return shoppingCard.findIndex(found);
}

// form validations

export const isAllValid = ({name, email, adress, psc}) => validateName(name) && validateEmail(email) && validateAdress(adress) && validatePsc(psc);

export const validateName = (t) => t.match(/(\w.+\s).+/i) ? true : false;
export const validateEmail = (t) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return t.match(re) ? true : false;
	}
export const validateAdress = (t) => t.match(/[a-zA-Z0-9]/) ? true : false;
export const validatePsc = (t) => t.match(/[0-9]/) ? true : false;
