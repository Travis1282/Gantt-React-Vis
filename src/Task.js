import React, { Component } from 'react'

class Task extends Component {
	

	render(){
		console.log(this.props)
		const taskList = this.props.selectedProject.map((task, i) => {
			return <li key={i} id={task.id}> {task.name} </li>
		})
		return(
			<ul>
				{taskList}
			</ul>
		)
	}
}


export default Task;