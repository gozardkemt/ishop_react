import React from 'react';
import PropTypes from 'prop-types';

export default class ShopForm extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			adress: '',
			psc: '',
			isSent: false,
		}
	}

	handleTyping = (e) => {
		const type = e.currentTarget.dataset.type;
	    this.setState({
			[type]: e.currentTarget.value,
			isSent: false
		});
	}

	isAllValid = () => {
		const {name, email, adress, psc} = this.state;
		const {validateName, validateEmail, validateAdress, validatePsc} = this;

		return validateName(name) && validateEmail(email) && validateAdress(adress) && validatePsc(psc);
	}

	validateName = (t) => t.match(/(\w.+\s).+/i) ? true : false;
	validateEmail = (t) => {
		const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return t.match(re) ? true : false;
	}
	validateAdress = (t) => t.match(/[a-zA-Z0-9]/) ? true : false;
	validatePsc = (t) => t.match(/[0-9]/) ? true : false;

	submitForm = () => {
		this.setState({
			isSent: true,
		})
	}

	unsubmitForm = () => {
		this.setState({
			isSent: false,
		})
	}

	resetPerson = () => {
		this.setState({
			name: '',
			email: '',
			adress: '',
			psc: '',
		})
	}

	render() {

		if (!this.props.activeShopForm) return null;

		ShopForm.propTypes = {
			closeForm: PropTypes.func,
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

		const xStyle = {
			position: 'absolute',
			top: '0',
			right: '0',
			margin: '0.5rem',
			padding: '0 0.5rem',
			color: 'white'
		}

		const {closeForm} = this.props;
		const {adress, email, name, psc, isSent} = this.state;
		const {
			handleTyping,
			submitForm,
			unsubmitForm,
			resetPerson,
			validateName,
			validateEmail,
			validateAdress,
			validatePsc,
			isAllValid
		} = this;

		const closeShopForm = () => {
			closeForm();
			unsubmitForm();
			resetPerson()
		};

		const clearShopForm = () => {
			unsubmitForm();
			resetPerson()
		};

		return (
				<form style={formStyle}>
					< Comfirmation
						adress={adress}
						name={name}
						email={email}
						isReady={!isAllValid() || !isSent}
						/>
					<b style={xStyle} onClick={closeShopForm}>X</b>
					<label>
						< ErrorMessage
							value={name}
							isSent={isSent}
							type={'meno'}
							isValid={validateName(name)}
							isAllValid={isAllValid()}
						/>
						< Input
							value={name}
							onKeyUp={handleTyping}
							type={'name'}
							isReady={isAllValid() && isSent}
						/>
					</label>
					<label>
						< ErrorMessage
							value={email}
							isSent={isSent}
							type={'email'}
							isValid={validateEmail(email)}
							isAllValid={isAllValid()}
						/>
						< Input
							value={email}
							onKeyUp={handleTyping}
							type={'email'}
							isReady={isAllValid() && isSent}
							/>
					</label>
					<label>
						< ErrorMessage
							value={adress}
							isSent={isSent}
							type={'adress'}
							isValid={validateAdress(adress)}
							isAllValid={isAllValid()}
						/>
						< Input
							value={adress}
							onKeyUp={handleTyping}
							type={'adress'}
							isReady={isAllValid() && isSent}
 						/>
					</label>
					<label>
						< ErrorMessage
							value={psc}
							isSent={isSent}
							type={'psc'}
							isValid={validatePsc(psc)}
							isAllValid={isAllValid()}
						/>
						< Input
							value={psc}
							onKeyUp={handleTyping}
							type={'psc'}
							isReady={isAllValid() && isSent}
 						/>
					</label>
					< Submit
						submitForm={submitForm}
						isReady={isAllValid() && isSent}
						closeShopForm={closeShopForm}
					/>
					< ClearForm
						isReady={isAllValid() && isSent}
						clearShopForm={clearShopForm}
					/>
				</form>
		)
	}
}

function Input({onKeyUp, isReady, type, value}) {

	return !isReady ? <input value={value} type='text' onChange={onKeyUp} data-type={type}></input> : null;
}

function ErrorMessage({type, value, isSent, isValid, isAllValid}) {

	if (isAllValid && isSent) { return null };

	return !isValid && isSent ? <b> Prosím vyplňte pole {type}: </b> : <b>{type}: </b>;
}

function Comfirmation({adress, email, name, isReady}) {

	const text = `Vážený ${name}, odoslali sme objednávku na ${adress}, potvrdenie ste dostali na emailovú adresu ${email}. Ďakujeme za nákup`;

	return  !isReady ? <b style={{textAlign:'center'}}>{text}</b> : null;
}

function Submit({submitForm, isReady, closeShopForm}) {

	const btnStyle = {
		margin: '0.5rem',
		padding: '0.5rem 1rem'
	}

	const text = isReady ? 'Zatvoriť formulár' : 'Odoslať objednávku';
	const func = isReady ? closeShopForm : submitForm;

	return <button style={btnStyle} onClick={func} type='button'>{text}</button>
}

function ClearForm({clearShopForm, isReady}) {

	return !isReady ? <button onClick={clearShopForm} type='button'>Vyčisti formulár</button> : null;
}
