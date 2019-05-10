import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShowClubs.css';

// I wanted to show a different style of doing forms in this component
// I used terinaries to show in-line edit forms in place the mapped food item.
// Additionally there is another terinary for the add food item form. In a more complicated app, we would probably make this a seperate component.
class ShowClubs extends Component {
  // componentDidMount() {
  //   this.props.getUserClubs(this.props.match.params.id)
  // }

  render() {
    const { clubs } = this.props
    return (
      <div className="clubs_container">
      {clubs &&
      <>
        {clubs.map(club => (
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
      </>
      }
      </div>
    )
  }
}
              
export default ShowClubs;