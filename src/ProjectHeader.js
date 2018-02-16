import React, { Component } from 'react';
import './App.js'

class Header extends Component{


	nowDates = (e) => {

	}
	
	addNew = (e) => {
	e.preventDefault();

			const now = new Date();
			const twoWeeks = now.setDate(now.getDate() +14);
			const endDate = new Date(twoWeeks);

			const item = {
			content: "New Task",
			start: new Date().toISOString().substring(0,10),
			end:  endDate.toISOString().substring(0,10),
			completed: false,
			belongs_to: 0,
			project_id: this.props.id
		}
	this.props.createItem(item);
				console.log(item)

	}
	render(){
		return(
			<div className="header">
				<img className="logo" src="./whirrLogo.png"/>
				<div className="addNew"  onClick={this.props.createProject} id="add">+</div>
			</div>
			)		
	}

}
export default Header;
