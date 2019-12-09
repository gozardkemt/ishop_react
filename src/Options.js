import React from 'react';

export default class Options extends React.Component {

	render() {

		return (
			<>
			{
				this.props.categories.map( c =>
					<option key={c.id} id={c.id}>{c.name}</option>
				)
			}
			</>
		)
	}
}
