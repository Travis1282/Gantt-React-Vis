import React, { Component } from 'react';
import Myform from './DatePicker'

class ItemEdit extends Component{
	constructor(props){
		super(props)

		this.state = {
			content: this.props.editedItem.content,
			start: this.props.editedItem.start,
			end: this.props.editedItem.end,
			completed: this.props.editedItem.completed,
			id: this.props.editedItem.id
		}
	}

	submitEdit = () => {
		// Do something later
	}

render(){
	// console.log(this.props.editedItem)
	// console.log(this.state)

	 

		return(
		<div>
			<form>
				name: <input type="text" name="content" value={this.state.content} />
				<Myform value ={this.state}/>
				<input type="hidden" name="id" value={this.state.id} />
				<button>submit</button>
			</form>
		</div>
		)
	}

}



export default ItemEdit;


