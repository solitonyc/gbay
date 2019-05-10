import React, { Component } from 'react'

export default class UserClubs extends Component {
  render() {
    return (
      <div>
        <div className="clubs_container">
        {this.props.clubs.map(club => (
          <div className="club_item_container" key={club.id}>
            <h1>{club.headline}</h1>            
            <img className='club_image' alt={club.model} src={club.image} />
            <p>Description: {club.description}</p>
            <p>Brand: {club.brand}</p>
            <p>Model: {club.model}</p>
            <p>Loft: {club.loft}</p>
            <p>Condition: {club.condition}</p>
            <p>Dexterity: {club.dexterity}</p>
            <p>Shaft: {club.shaft_name}</p>
            <p>Shaft Flex: {club.shaft_flex}</p>
            <p>Shaft Weight: {club.shaft_weight}</p>
            <p>Club Color: {club.club_color}</p>
            <p>Club Length: {club.club_length}</p>
            <h2>Price: {club.price}</h2>
      </div>
        ))}
      </div>
      </div>
    )
  }
}
