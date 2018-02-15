import React, { Component } from 'react';
import './App.css';
import ItemTimeline from './ItemTimeline';
import request from "superagent";
import Task from "./Task"
import ProjectEdit from "./ProjectEdit"



class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      projects: [],
      selectedProject: "",
      editedProject: "",
    }
  }
  componentDidMount() {
    request
      .get('http://localhost:9292/users/1/projects')
      .end((err, res) => {
          if (err) console.log(err)
          const parsedData = JSON.parse(res.text);
          this.setState({projects: [...parsedData]})
          this.setState({user_id: 1})
      })
  }

  viewProject = (e) => {
    const projId = e.currentTarget.parentNode.parentNode.id
    request
      .get('http://localhost:9292/projects/'+projId+'/tasks')
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text);
        this.setState({selectedProject: [...parsedData]})
      })
  }
  createItem = (newItem) => {
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
  createProject = () => {
    const project = {
      content: "New Project",
      start: "",
      end: "",
      completed: false,
      user_id: this.state.user_id
    }
    request
      .post("http://localhost:9292/projects")
      .type('form')
      .send(project)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
      })

  }
  deleteProject = (e) => {
    // Gets the id of the li element the button is in
    const index = e.currentTarget.parentNode.parentNode.id
    const id = this.state.projects[index].id
    request
      .delete('http://localhost:9292/projects/'+id)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
      })
  }
  openEdit = (e) => {
    const index = e.currentTarget.parentNode.parentNode.id
    const project = this.state.projects[index]
    this.setState({editedProject: project})
  }
  editProject = (project) => {
    const id = project.id
    request
      .put('http://localhost:9292/projects/'+id)
      .type('form')
      .send(project)
      .end((err, res) => {
        if (err) console.log(err)
        const parsedData = JSON.parse(res.text)
        this.setState({projects: [...parsedData.projects]})
        this.setState({editedProject: ""})
      })
  }

  render() {
    const projectList = this.state.projects.map((project, i) => {
      return <li key={i} id={i} >
                <div className="project">
                  <h2 className="project-name" onClick={this.viewProject}>{project.content}</h2>
                  <p className="date">Start Date: {project.start}</p>
                  <p className="date">End Date: {project.end}</p>
                  <button id="edit-btn" onClick={this.openEdit}>Edit Project</button>
                  <button id="delete-btn" onClick={this.deleteProject}>Delete Project</button>
                </div>
             </li>
    })
    return (
      <div className="App">
      <button onClick={this.createProject}>+</button>
        
      
      {this.state.selectedProject === "" ? <ul>{projectList}</ul> :<ItemTimeline createItem={this.createItem} editItem={this.editItem} deleteItem={this.deleteItem} selectedProject={this.state.selectedProject}/>}
      {this.state.editedProject === "" ? null : <ProjectEdit editedProject={this.state.editedProject} editProject={this.editProject}/>}

      </div>
    );
  }
}

export default App;
