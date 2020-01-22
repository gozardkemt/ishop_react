import React from 'react';
import PropTypes from 'prop-types';
import { FormStyleWrapper } from './StyleWrappers.js';
import { isAllValid, validateName, validateEmail, validateAdress, validateZip, isCharNotAllowedInZipField } from './appServices.js';

const defaultFormState =  {
	name: '',
	email: '',
	adress: '',
	zip: '',
	isSent: false,
}

export default class ShopForm extends React.Component {

	constructor(props) {
		super(props)
		this.state = defaultFormState
	}

	submitForm = () => { this.setState({ isSent: true })}
	resetShopForm = () => { this.setState(defaultFormState) }

	handleTyping = (e) => {

		const type = e.currentTarget.dataset.type;
		const char = e.nativeEvent.data;

		if (type === 'zip' && isCharNotAllowedInZipField(char)) { return };

	    this.setState({
			[type]: e.currentTarget.value,
			isSent: false
		});
	}

	render() {

		if (!this.props.activeShopForm) return null;

		const {closeForm} = this.props;
		const {adress, email, name, zip, isSent} = this.state;
		const {handleTyping, submitForm, resetShopForm} = this;

		return (
				<FormStyleWrapper>
					< Comfirmation
						adress={adress}
						name={name}
						email={email}
						isReady={!isAllValid(this.state) || !isSent}
						/>
					< CloseFormButton onClick={() => { resetShopForm(); closeForm() }} />
					<label>
						< ErrorMessage
							value={name}
							isSent={isSent}
							type={'meno'}
							isValid={validateName(name)}
							isAllValid={isAllValid(this.state)}
						/>
						< Input
							value={name}
							onKeyUp={handleTyping}
							type={'name'}
							isReady={isAllValid(this.state) && isSent}
						/>
					</label>
					<label>
						< ErrorMessage
							value={email}
							isSent={isSent}
							type={'email'}
							isValid={validateEmail(email)}
							isAllValid={isAllValid(this.state)}
						/>
						< Input
							value={email}
							onKeyUp={handleTyping}
							type={'email'}
							isReady={isAllValid(this.state) && isSent}
							/>
					</label>
					<label>
						< ErrorMessage
							value={adress}
							isSent={isSent}
							type={'adress'}
							isValid={validateAdress(adress)}
							isAllValid={isAllValid(this.state)}
						/>
						< Input
							value={adress}
							onKeyUp={handleTyping}
							type={'adress'}
							isReady={isAllValid(this.state) && isSent}
 						/>
					</label>
					<label>
						< ErrorMessage
							value={zip}
							isSent={isSent}
							type={'zip'}
							isValid={validateZip(zip)}
							isAllValid={isAllValid(this.state)}
						/>
						< Input
							value={zip}
							onKeyUp={handleTyping}
							type={'zip'}
							isReady={isAllValid(this.state) && isSent}
 						/>
					</label>
					< Submit
						submitForm={submitForm}
						isReady={isAllValid(this.state) && isSent}
						closeShopForm={() => { resetShopForm(); closeForm() }}
					/>
					< ClearFormButton
						isReady={isAllValid(this.state) && isSent}
						clearShopForm={resetShopForm}
					/>
				</ FormStyleWrapper>
		)
	}
}

ShopForm.propTypes = {
	closeForm: PropTypes.func,
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
