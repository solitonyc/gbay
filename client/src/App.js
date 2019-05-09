import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// jwt-decode lets us decode json web token and access the data in them
import decode from 'jwt-decode';
import Login from './components/Login'
import Register from './components/Register'
import ShowClubs from './components/ShowClubs'
import ClubItem from './components/ClubItem'
// import ShowFlavors from './components/ShowFlavors'

// After building the backend, we can make all of our API calls. Then import them here
import {
  loginUser,
  registerUser,
  showClub,
  showClubItem,
  postClub,
  putClub,
  destroyClub,
  
} from './services/api-helper';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null, // we set the logged in user here. This way we know if the user is logged in
      club: [],
      clubItem: null,    // Value for a selected food item
      formData: {        // Form data for addin a food
        headline: ""
      },
      // selectedFlavor: '', // Form data for adding a flavor to a food
      authFormData: {
        email: "",
        password_digest: ""
      },

      loginFormData: {
        email: "",
        password: ""
      }
    }
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.getClub = this.getClub.bind(this)
    this.getClubItem = this.getClubItem.bind(this)
    this.addClub = this.addClub.bind(this)
    this.updateClub = this.updateClub.bind(this)
    this.deleteClub = this.deleteClub.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setClubForm = this.setClubForm.bind(this)
    this.loginHandleChange = this.loginHandleChange.bind(this)
    // this.decodeToken = this.decodeToken.bind(this)
     
  }

  // onClick function to redirect to the login form 
  handleLoginButton() {
    this.props.history.push("/login")
  }

// decodeToken(token) {
//   const userData = decode(token)
//   this.setState({
//     currentUser: userData.id
//   })
// }

  // On page load, we grab all the foods and flavors
  // We also check local storage to see if the browser has a saved token
  // If so, we decode the token to get the user data and save it in state.
  componentDidMount() {
    this.getClub()
    // this.getFlavors();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  // Function to get all food from our API
  async getClub() {
    const club = await showClub();
    this.setState({ club })
  }

  // Function to get a single food item from our API
  async getClubItem(id) {
    const clubItem = await showClubItem(id);
    this.setState({ clubItem })
  }


  // Function to create a new food in our API
  // We take the response and add it to our Food array in state
  async addClub() {
    const newClub = await postClub(this.state.authFormData)
    this.setState(prevState => ({
      club: [...prevState.club, newClub],
      authFormData: {
        headline: ""
      }
    }))
  }

  // Function to update an existing food in our API
  // We find the index of the updated food in state
  // We build a new array, replacing the old food item with the new one
  // Then we setState with the new food array
  async updateClub(clubItem) {
    const updatedClubItem = await putClub(this.state.formData, clubItem.id);
    const index = this.state.club.indexOf(clubItem);
    const clubArray = this.state.club
    clubArray[index] = updatedClubItem
    this.setState({
      club: clubArray
    })
  }

  // Function to delete a food item
  // We then build a new food array with the delete item spliced out
  async deleteClub(clubItem) {
    await destroyClub(clubItem.id);
    const index = this.state.club.indexOf(clubItem);
    const clubArray = this.state.club
    clubArray.splice(index, 1);
    this.setState({
      club: clubArray
    })
  }

  // // Function to get all flavors
  // async getFlavors() {
  //   const flavors = await showFlavors();
  //   this.setState({ flavors })
  // }

  // Function to add a flavor to a food
  // We first find the flavor using by comparing the name from the flavor form data and the name in the flavors array
  // Then we make our API call using that flavors id and the id of the food argument passed to this function
  // async addFlavorToFood(foodItem) {
  //   const newFlavor = this.state.flavors.find(flavor => flavor.name === this.state.selectedFlavor);
  //   const newFoodItem = await putFoodFlavor(foodItem.id, newFlavor.id);
  //   this.setState({
  //     foodItem: newFoodItem
  //   })
  // }

  // Function to login a user
  // we set the user data in state and the JWT in local storage
  
  loginHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      loginFormData: {
        ...prevState.loginFormData,
        [name]: value
      }
    }));
  }
  
  
  async handleLogin() {
    const token = await loginUser(this.state.authFormData)
    const userData = decode(token.token)
    this.setState({
      currentUser: userData
    })
    // console.log(userData.token)
    localStorage.setItem("jwt", token.token)
  }

  // Function to register a user
  // After register, we just call the login function with the same data
  async handleRegister(e) {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  // Function to logout user
  // We delete the token from local storage and set the current user in state back to null
  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  // Handle change function for the auth forms
  authHandleChange(e) {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  


  // handle change function for our create food form
  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ formData: { [name]: value } });
  }

  // Function to set the form data for the update food form
  setClubForm(club) {
    this.setState({
      formData: {
        name: club.name
      }
    })
  }

  // //handle change for the flavor drop down form
  // flavorForm(e) {
  //   this.setState({
  //     selectedFlavor: e.target.value
  //   })
  // }

  render() {
    return (
      <div>
        <header>
          <Link to="/"><h1>GBay</h1></Link>
          {/* Here we use a terinary to check if there is a logged in user set in state.
              If there is no logged in user, we show a login button instead of the site nav */}
          {this.state.currentUser
            ?
            <div>
              {/* This is a greeting to the user if there user info has been set in state.
              We use the guard operator to check '&&' */}
              <h3>Hi {this.state.currentUser && this.state.currentUser.email}<button onClick={this.handleLogout}>logout</button></h3>
              <Link to="/club">View All Club</Link>
              &nbsp;
              {/* <Link to="/flavors">View All Flavors</Link> */}
              <hr />
            </div>
            :
            <button onClick={this.handleLoginButton}>Login/register</button>
          }
        </header>
        {/* setting up our routes */}
        <Route exact path="/login" render={(props) => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.loginHandleChange}
            formData={this.state.loginFormData} />)} />
        <Route exact path="/register" render={(props) => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            currentUser={this.state.currentUser}
            decodeToken={this.decodeToken}
            formData={this.state.authFormData} />)} />
        <Route exact path="/club" render={(props) => (
          <ShowClubs
            clubs={this.state.club}
            formData={this.state.formData}
            getClubItem={this.getClubItem}
            deleteClub={this.deleteClub}
            handleSubmit={this.addClub}
            handleChange={this.handleChange}
            setClubForm={this.setClubForm}
            updateClub={this.updateClub}
          />)} />
        {/* <Route exact path="/flavors" render={(props) => (
          <ShowFlavors flavors={this.state.flavors} />)} /> */}
        <Route exact path="/club/:id" render={(props) => (
          <ClubItem
            clubItem={this.state.clubItem}
            // flavors={this.state.flavors}
            // selectedFlavor={this.state.selectedFlavor}
            // handleChange={this.flavorForm}
            // addFlavorToFood={this.addFlavorToFood} 
            />)} />
      </div>
    );
  }
}

export default withRouter(App);

