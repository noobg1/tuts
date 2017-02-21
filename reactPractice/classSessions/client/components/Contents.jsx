import React from 'react'

export default class Contents extends React.Component {
  render() {
    let contents = [
      { name: "Intro",
        page: 1 
      },
      { 
        name: "Getting Strated",
        page: 4 
      }
    ]
    let contentsMapped = contents.map((item, index) => {
      return(<li key={index}>
        name: {item.name},   
        page: {item.page}
        </li>
      );
    }
    )
    return (
      <div>
        <ul>
          {contentsMapped}
        </ul>
      </div>
    )
  }
}