import React, { Component } from 'react';
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

	  let start = this.state.start.toISOString().substring(0, 10)
  	  let end = this.state.end.toISOString().substring(0, 10)

	return(
		<div>
			<form>
				name: <input type="text" name="content" value={this.state.content} />
				start date: <input type="date" name="start" value={start} />
				end date: <input type="date" name="end" value={end} />
				competed: <input type="text" name="completed" value={this.state.completed} />
				<input type="hidden" name="id" value={this.state.id} />
				<button>submit</button>
			</form>
		</div>
		)
	}

}



export default ItemEdit;


