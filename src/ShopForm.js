import React, { useState } from 'react';
import { FormStyleWrapper } from './StyleWrappers.js';
import { isAllValid, validateName, validateEmail, validateAdress, validateZip, isCharNotAllowedInZipField } from './appServices.js';

export const ShopForm = ({closeForm, activeShopForm}) => {

	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ adress, setAdress ] = useState('');
	const [ zip, setZip ] = useState('');
	const [ isSent, setIsSent ] = useState(false);

	const state = { name, email, adress, zip }
	const setStatefun = {
		name: setName,
		email: setEmail,
		adress: setAdress,
		zip: setZip,
		isSent: setIsSent
	}

	if (!activeShopForm) return null;

	const submitForm = () => setIsSent(true);
	const resetShopForm = () => {
		setName('');
		setEmail('');
		setAdress('');
		setZip('');
		setIsSent(false);
	}

	const handleTyping = (e) => {

		const type = e.currentTarget.dataset.type;
		const char = e.nativeEvent.data;
		const val = e.currentTarget.value;

		if (type === 'zip' && isCharNotAllowedInZipField(char)) { return };

		setIsSent(false);
		setStatefun[type](val);
	}

	return (
			<FormStyleWrapper>
				< Comfirmation
					adress={adress}
					name={name}
					email={email}
					isReady={!isAllValid(state) || !isSent}
					/>
				< CloseFormButton onClick={() => { resetShopForm(); closeForm() }} />
				<label>
					< ErrorMessage
						value={name}
						isSent={isSent}
						type={'meno'}
						isValid={validateName(name)}
						isAllValid={isAllValid(state)}
					/>
					< Input
						value={name}
						onKeyUp={handleTyping}
						type={'name'}
						isReady={isAllValid(state) && isSent}
					/>
				</label>
				<label>
					< ErrorMessage
						value={email}
						isSent={isSent}
						type={'email'}
						isValid={validateEmail(email)}
						isAllValid={isAllValid(state)}
					/>
					< Input
						value={email}
						onKeyUp={handleTyping}
						type={'email'}
						isReady={isAllValid(state) && isSent}
						/>
				</label>
				<label>
					< ErrorMessage
						value={adress}
						isSent={isSent}
						type={'adress'}
						isValid={validateAdress(adress)}
						isAllValid={isAllValid(state)}
					/>
					< Input
						value={adress}
						onKeyUp={handleTyping}
						type={'adress'}
						isReady={isAllValid(state) && isSent}
						/>
				</label>
				<label>
					< ErrorMessage
						value={zip}
						isSent={isSent}
						type={'zip'}
						isValid={validateZip(zip)}
						isAllValid={isAllValid(state)}
					/>
					< Input
						value={zip}
						onKeyUp={handleTyping}
						type={'zip'}
						isReady={isAllValid(state) && isSent}
						/>
				</label>
				< Submit
					submitForm={submitForm}
					isReady={isAllValid(state) && isSent}
					closeShopForm={() => { resetShopForm(); closeForm() }}
				/>
				< ClearFormButton
					isReady={isAllValid(state) && isSent}
					clearShopForm={resetShopForm}
				/>
			</ FormStyleWrapper>
	)

}


function ErrorMessage({type, value, isSent, isValid, isAllValid}) {

	if (isSent) {
		if (!value) {return <b> Prosím vyplňte pole {type}: </b>}
		if (!isValid) {return <b> Pole {type} nie je v správnom formáte </b>}
		if (isAllValid) {return null}
	}

	return  <b>{type}: </b>
}

function Comfirmation({adress, email, name, isReady}) {

	const text = `Vážený ${name}, odoslali sme objednávku na ${adress}, potvrdenie ste dostali na emailovú adresu ${email}. Ďakujeme za nákup`;

	return  !isReady ? <b style={{textAlign:'center'}}>{text}</b> : null;
}

const submitButtonStyle = {
	margin: '0.5rem',
	padding: '0.5rem 1rem'
}

function Submit({submitForm, isReady, closeShopForm}) {

	const text = isReady ? 'Zatvoriť formulár' : 'Odoslať objednávku';
	const func = isReady ? closeShopForm : submitForm;

	return <button style={submitButtonStyle} onClick={func} type='button'>{text}</button>
}

const closeFormStyle = {
	position: 'absolute',
	top: '0',
	right: '0',
	margin: '0.5rem',
	padding: '0 0.5rem',
	color: 'white'
}


const CloseFormButton = (props) => <b style={closeFormStyle} onClick={props.onClick}>X</b>
const Input = ({onKeyUp, isReady, type, value}) => !isReady ? <input value={value} type='text' onFocus={(e) => { console.log(e.target.selectionStart) }} onChange={onKeyUp} data-type={type}></input> : null;
const ClearFormButton = ({clearShopForm, isReady}) => !isReady ? <button onClick={clearShopForm} type='button'>Vyčisti formulár</button> : null;
