import React, { Component } from 'react';
import './App.css';
import ItemTimeline from './ItemTimeline';
import request from "superagent";
import Task from "./Task"



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      selectedProject: "",
    }
  }
  componentDidMount() {
    request
      .get('http://localhost:9292/users/1/projects')
      .end((err, res) => {
          if (err) console.log(err)
          const parsedData = JSON.parse(res.text);
          this.setState({projects: [...parsedData]})
      })
  }

  viewProject = (e) => {
    const projId = e.currentTarget.id
    request
      .get('http://localhost:9292/projects/'+projId+'/tasks')
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text);
        this.setState({selectedProject: [...parsedData]})
      })
  }
  createItem = (newItem) => {
    console.log("createItemCalled", newItem)
      request
        .post('http://localhost:9292/tasks')
        .type('form')
        .send(newItem)
        .end((err, newItem) => {
          console.log(err, newItem)
          const parsedData = JSON.parse(newItem.text)
          console.log(parsedData)
          this.setState({selectedProject: [...parsedData.projTasks]})
    })
  }



  deleteItem = (item) => {

    console.log(item)
    request
      .delete('http://localhost:9292/tasks/' + item)
      .end((err, deletedItem) => {
        console.log(err, deletedItem)
        const parsedData = JSON.parse(deletedItem.text)
        this.setState({selectedProject: [...parsedData.tasks]})

      })
  }

  editItem = (item) => {
    request
      .put("http://localhost:9292/tasks/"+item.id)
      .type('form')
      .send(item)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({selectedProject: [...parsedData.projTasks]})
      })
  }

  render() {
    console.log("Selected projects in app.js ",this.state.selectedProject)
    const projectList = this.state.projects.map((project, i) => {
      return <li key={i} id={project.id} onClick={this.viewProject}> {project.content} </li>
    })
    return (
      <div>
      
      {this.state.selectedProject === "" ? <ul>{projectList}</ul> : <ItemTimeline createItem={this.createItem} editItem={this.editItem} deleteItem={this.deleteItem} selectedProject={this.state.selectedProject}/>}
       
      </div>
    );
  }
}

export default App;
