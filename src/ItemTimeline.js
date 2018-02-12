import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'



const items = [{
  start: new Date(2010, 7, 15),
  end: new Date(2010, 8, 2),  // end is optional
  content: 'Trajectory A',
}]
  height: '500px',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  // zoomMax: 10000000,
  type: 'background',
  format: {
    minorLabels: {
      minute: 'h:mma',
      hour: 'ha'
    }
  }
}


// dynamic styling 
  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });

// style={getItemStyle()}

  constructor(props){
    super(props)
    this.state = {
      items: this.props.selectedProject
    }
  }

  render(){
    console.log(this.state.items)
  return (
    <div>
      <Timeline options={options} items={this.state.items}/>
      Timeline
    </div>
  );
  }
}
export default ItemTimeline;    
