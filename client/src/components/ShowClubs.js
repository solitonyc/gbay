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
            <h1 className='club_headline'>{club.headline}</h1>  
            <p className='club_details_descrip'><span className='club_descrip_bold'>Description:</span> {club.description}</p>          
            <img className='club_image' alt={club.model} src={club.image} />
            <div className='club_details_text'><span className='club_descrip_bold'>Brand:</span> {club.brand}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Model:</span> {club.model}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Loft:</span> {club.loft}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Condition:</span> {club.condition}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Dexterity:</span> {club.dexterity}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Shaft:</span> {club.shaft_name}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Shaft Flex:</span> {club.shaft_flex}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Shaft Weight:</span> {club.shaft_weight}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Club Color:</span> {club.club_color}</div>
            <div className='club_details_text'><span className='club_descrip_bold'>Club Length:</span> {club.club_length}</div>
            <div className='club_details_price'><span className='club_descrip_bold'>Price:</span> {club.price}</div>
          </div>
        ))}
      </>
      }
      </div>
    )
  }
}
              
export default ShowClubs;