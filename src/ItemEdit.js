import React, { Component } from 'react';
import Zoom from 'react-reveal/Zoom';
import OverlayController from 'react-overlay-controller';


class ItemEdit extends Component{
	constructor(props){
		super(props)

		this.state = {
			content: this.props.editedItem.content,
			start: this.props.editedItem.start,
			end: this.props.editedItem.end,
			completed: this.props.editedItem.completed,
			id: this.props.editedItem.id,
			belongs_to: this.props.editedItem.belongs_to,
			project_id: this.props.editedItem.project_id
		}
	}

	handleEditText = (e) => {
		const key = e.currentTarget.name
		this.setState({[key]: e.currentTarget.value})
	}
	handleEditDate = (e) => {
		const stateDate = new Date(e.target.value)
		const key = e.currentTarget.name
		this.setState({[key]: stateDate})
	}

	submitEdit = (e) => {
		e.preventDefault();
		const item = {
			content: this.state.content,
 	 		start: this.state.start.toISOString().substring(0,10),
 	 		end: this.state.end.toISOString().substring(0,10),
 	 		completed: this.state.completed,
 	 		id: this.state.id,
 	 		belongs_to: this.state.belongs_to,
 	 		project_id: this.state.project_id
		} 
		this.props.getEdits(item)
	}
	submitDelete = (e) => {
		e.preventDefault();
		this.props.deleteItem(this.state.id)
	}

render(){
  let start = this.state.start.toISOString()
  let end = this.state.end.toISOString()
		return(
		<div>
			<div id="modal">
				<Zoom>
					<div id="modal-content">
						<form>
							name: <input type="text" name="content" value={this.state.content} onChange={this.handleEditText}/>
							start date: <input type="date" name="start" required="required" value={start.substring(0, 10)} onChange={this.handleEditDate}/>
							end date: <input type="date" name="end" required="required" value={end.substring(0, 10)} onChange={this.handleEditDate}/>
							competed: <input type="text" name="completed" value={this.state.completed} onChange={this.handleEditText}/>
							<input type="hidden" name="id" value={this.state.id}/>
							<input type="hidden" name="project_id" value={this.state.project_id}/>
							<input type="hidden" name="belongs_to" value={this.state.belongs_to}/>
							<button onClick={this.submitEdit}>submit</button>
							<button onClick={this.submitDelete}>delete</button>
						</form>
					</div>
				</Zoom>
			</div>

		</div>
		)
	}

}



export default ItemEdit;


