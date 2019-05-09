import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ShowClubs.css';

// I wanted to show a different style of doing forms in this component
// I used terinaries to show in-line edit forms in place the mapped food item.
// Additionally there is another terinary for the add food item form. In a more complicated app, we would probably make this a seperate component.
class ShowClubs extends Component {
  constructor(props) {
    super(props);
    // We set two boolean values in state to check if the forms should be shown
    this.state = {
      isAdd: false,
      isEdit: false
    }
  }
  render() {
    return (
      <div className="clubs_container">
        <h1>SEE ALL CLUBS PAGE</h1>
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


            {/* Here is where we user a terinary for the edit form.
              If the isEdit in state is set to the current food id, then we show an edit form for just that item */}
            {this.state.isEdit === club.id
              ?
              <div>
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.props.updateClub(club);
                  this.setState({
                    isEdit: false
                  });
                }}>
                  <input
                    headline="text"
                    type="text"
                    value={this.props.formData.name}
                    onChange={this.props.handleChange} />
                  <button>Submit</button>
                </form>
              </div>
              :
              // When the isEdit does not equal the current food id, display the food info like normal
              // This inludes the food name inside a link, and edit button and delete button
              <div>
                <Link to={`/club/${club.id}`} onClick={() => { this.props.getClubItem(club.id) }}>{club.name}</Link>
                <button onClick={() => {
                  // the edit form data is preset using the setFoodForm function and the current foods data 
                  this.props.setClubForm(club);
                  // then we set isEdit in state to the current foods id
                  this.setState({
                    isEdit: club.id
                  })
                }}>edit</button>
                <button onClick={() => { this.props.deleteClub(club) }}>delete</button>
              </div>
            }
          </div>
        ))}
        {/* incase you haven't seen it, <hr /> just makes an horizontle rule (or line) accross the page */}
        <hr />
        {this.state.isAdd // Same setup as before but since there will only ever be one add form, a simple true/false boolean will work
          ?
          // When the 'Add' button is clicked, a create food form is shown.
          // When the 'Submit' button is clicked, when ship the data to our API and reset the form back to a button
          <div>
            <form onSubmit={(e) => {
              e.preventDefault();
              this.props.handleSubmit();
              this.setState({ isAdd: false })
            }}>
              <input
                name="name"
                type="text"
                value={this.props.formData.name}
                onChange={this.props.handleChange} />
              <button>submit</button>
            </form>
          </div>
          :
          <button onClick={() => {
            this.setState({ isAdd: true })
          }}>Add</button>
        }
      </div>
    )
  }
}

export default ShowClubs;