import React, { Component } from 'react'
import "./EditModal.css"

class ProjectEdit extends Component {
	constructor(props){
		super(props)

		this.state = {
			content: this.props.editedProject.content,
			start: this.props.editedProject.start,
			end: this.props.editedProject.end,
			completed: this.props.editedProject.completed,
			id: this.props.editedProject.id,
			user_id: this.props.editedProject.user_id
		}
	}

	handleEdit = (e) => {
		const key = e.currentTarget.name
		this.setState({[key]: e.currentTarget.value})
	}

	submitEdit = (e) => {
		e.preventDefault();
		this.props.editProject(this.state)
	}

	render() {
		return(
			<div id="modal">
				<div id="modal-content">
					<form>
						<div class="col-md-3 col-sm-3 col-xs-6"> <a href="#" class="btn btn-sm animated-button victoria-green" style={{width: 15 + 'px', height: 15 + 'px', borderRadius: 50 +'px', float:'right',  margin: '-10px -10px 0 0'}}>X</a> </div>
						<p>Name: <input type="text" name="content" value={this.state.content} onChange={this.handleEdit}/></p>
						<p>Start Date: <input type="date" name="start" required="required" value={this.state.start} onChange={this.handleEdit}/></p>
						<p>End Date: <input type="date" name="end" required="required" value={this.state.end} onChange={this.handleEdit}/></p>
						<p>Completed: <input type="text" name="completed" value={this.state.completed} onChange={this.handleEdit}/></p>
						<input type="hidden" name="id" value={this.state.id}/>
						<input type="hidden" name="user_id" value={this.state.user_id}/>
						<button onClick={this.submitEdit}>submit</button>
					</form>
				</div>
			</div>
		)
	}
}


export default ProjectEdit