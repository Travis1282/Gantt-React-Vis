import React, { Component } from 'react';
import './App.js'
import Time from 'react-visjs-timeline'

const options = {
  width: '100%',
  height: '400px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000000,
  zoomMax: 100000000000,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}


       // // create groups
       //  var numberOfGroups = 5; 
       //  var groups = new Set()
       //  for (var i = 0; i < numberOfGroups; i++) {
       //      groups.add({
       //        id: i,
       //        content: 'Truck ' + i
       //      })
       //  }

        // create items
        const items = [[{
                  start: new Date(2010, 7, 15),
                  end: new Date(2010, 8, 2),  // end is optional
                  content: 'Trajectory A'
                },{
                  start: new Date(2012, 7, 15),
                  end: new Date(2013, 8, 2),  // end is optional
                  content: 'Trajectory A'
                }]]

      // const items = [];

// dynamic styling 
  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });


class Timeline extends Component {
    constructor(props){
    super(props)
    this.state = {
      id: this.props.allTasks.id,
      start: this.props.allTasks.startdate,
      end: this.props.allTasks.enddate,
      content: this.props.allTasks.name
    }
  }


  render(){
        const projects = this.props.allProjects.map((item, i) => {
        return <div style={getItemStyle()} id="project" key={i}>{this.props.allProjects[i].name} {this.props.allProjects[i].startdate} {this.props.allProjects[i].enddate}}</div>
     })
        const tasks = this.props.allTasks.map((item, i) => {
          console.log(this.props.allTasks)
          // items.push(this.props.allTasks)
        return <div id="task" key={i}>{this.props.allTasks[i].name} {this.props.allTasks[i].startdate} {this.props.allTasks[i].enddate}</div>
    })

 return (
      <div>
        <h1> projects:</h1> {projects}
        <h1> tasks:</h1> {tasks}
         <Timeline options={options} items={items} />

      </div>
    );

  }
}
export default Timeline;    