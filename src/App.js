import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timeline from './Timeline';


// fake data generator // temp

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}
const getProjets = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    name: `project ${k}`,
    startdate: `start date`+randomDate(new Date(2018, 0, 1), new Date(2018,12,31)) +``,
    enddate: `end date` +randomDate(new Date(2019, 0, 1), new Date(2019,12,31)) +``,
    completed: false,
    // user_id INT references users(id)

  }));

const getTasks = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    name: `task ${k}`,
    startdate: `start date`+randomDate(new Date(2018, 0, 1), new Date(2018,12,31)) +``,
    enddate: `end date` +randomDate(new Date(2019, 0, 1), new Date(2019,12,31)) +``,
    completed: false,
    length: ``+ this.startdate - this.enddate +``
    // user_id INT references users(id)

  }));
  

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: getProjets(5),
      tasks: getTasks(20)
    }
  }

  // componentDidMount() {
  //   request
  //     .get('http://localhost:9292/')
  //     .end((err, res) => {
  //         console.log(err, res)
  //         const parsedData = JSON.parse(res.text);
  //         this.setState({data: [...parsedData]})
  //     })

  // }



  render() {
    return (
      <div>
        <Timeline allProjects={this.state.projects} allTasks={this.state.tasks}/>
      </div>
    );
  }
}

export default App;
