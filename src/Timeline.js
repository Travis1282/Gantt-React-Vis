import React, { Component } from 'react';
import './App.js'
import Time from 'react-visjs-timeline'

const options = {
  width: '100%',
  height: '100%',
  stack: false,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000000,
  zoomMax: 100000000000,
  type: 'background'
}



// dynamic styling 
  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });

// style={getItemStyle()}

class Timeline extends Component {
    constructor(props){
    super(props)
    this.state = {
      items: this.props.allTasks
    }
  }
  render(){
 return (
      <div>
         <Time options={options} items={this.state.items} />

      </div>
    );

  }
}
export default Timeline;    
