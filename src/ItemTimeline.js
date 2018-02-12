import React, { Component } from 'react';
import './App.js'
import Timeline from 'react-visjs-timeline'

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


const items = [{
  start: new Date(2010, 7, 15),
  end: new Date(2010, 8, 2),  // end is optional
  content: 'Trajectory A',
}]

// dynamic styling 
  const getItemStyle = () => ({
      width: ``+ this.length +``,
      background: 'lightgreen'
      // background: isDragging ? 'lightgreen' : 'grey',
  });

// style={getItemStyle()}

class ItemTimeline extends Component {
//     constructor(props){
//     super(props)
//     this.state = {
//       start: new Date('December 17, 1995 03:24:00'),
//       end: new Date('December 30, 1995 03:24:00'),
//     }
  // }




  render(){
    //console.log([this.state])

   return (
      <div>
        <Timeline options={options} items={items} />
      </div>
    );

  }
}
export default ItemTimeline;    
