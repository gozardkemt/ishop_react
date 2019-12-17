import React from 'react';


export default class ShopForm extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			name: '',
			email: '',
			adress: ''
		}
	}

	handleTyping = (e) => {
		const type = e.currentTarget.dataset.type;
	    this.setState({
			[type]: e.currentTarget.value,
		});
	}

	render() {

		if (!this.props.activeShopForm) return null;

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
			alignSelf: 'flex-end',
    		padding: '1rem',
    		marginTop: '-6rem'
		}

		const {closeForm} = this.props;
		const {adress, email, name} = this.state;
		const {handleTyping} = this;

		return (
				<form style={formStyle}>
					<b style={xStyle} onClick={closeForm}>X</b>
					<label>
						Meno:
						<input onKeyUp={handleTyping} data-type={'name'} />
						< ErrorMessage
							value={name}
							errorText={'Vaše meno'}
						/>
					</label>
					<label>
						Email:
						<input onKeyUp={handleTyping} data-type={'email'} />
						< ErrorMessage
							value={email}
							errorText={'Váš email'}
						/>
					</label>
					<label>
						Adresa:
						<input onKeyUp={handleTyping} data-type={'adress'} />
						< ErrorMessage
							value={adress}
							errorText={'Vašu adresu'}
						/>
					</label>
					<button type='submit'>Odoslať objednávku</button>
				</form>
		)
	}
}

class ErrorMessage extends React.Component {

	render() {

		const {errorText, value} = this.props;

		if (value.length > 3) { return null }

		return <span style={{color:'red'}}> Prosím vyplňte {errorText}</span>

	}
}
