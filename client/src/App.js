import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
// jwt-decode lets us decode json web token and access the data in them
import decode from 'jwt-decode';
import ShowClubs from './components/ShowClubs';
import ClubItem from './components/ClubItem';
import LinkButton from './components/LinkButton';
import AuthForm from './components/AuthForm';
import UpdateForm from './components/UpdateForm'
import './App.css';



// After building the backend, we can make all of our API calls. Then import them here
import {
  loginUser,
  registerUser,
  showUserClubs,
  showUserClubItem,
  showClub,
  showClubItem,
  postClub,
  putClub,
  destroyClub,
  destroyUser,
  putUser
  
} from './services/api-helper'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClub: null, // we set the logged in user here. This way we know if the user is logged in
      clubs: [],
      clubItem: null,    
      formData: {        
        email: ""
      },
      currentUser: null,
      authFormData: {
        email: "",
        password: ""
      },
      // loginFormData: {
      //   email: "",
      //   password: ""
      // }
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
    this.handleUpdate = this.handleUpdate.bind(this)
    this.setClubForm = this.setClubForm.bind(this)
    this.loginHandleChange = this.loginHandleChange.bind(this)
   
    this.decodeToken = this.decodeToken.bind(this)
     
  }

  // onClick function to redirect to the login form 
  handleLoginButton() {
    this.props.history.push("/login")
  }

  decodeToken(token) {
    const userData = decode(token)
    this.setState({
      currentUser: userData.id
    })
  }

  // On page load, we grab all the foods and flavors
  // We also check local storage to see if the browser has a saved token
  // If so, we decode the token to get the user data and save it in state.
  async componentDidMount() {
    const clubs = await this.getUserClubs(1)
    
    await this.getClub()
    // this.getFlavors();
    const checkUser = localStorage.getItem("jwt");
    if (checkUser) {
      const user = decode(checkUser);
      this.setState({
        currentUser: user
      })
    }
  }

  async getUserClubs(user_id) {
    const clubs = await showUserClubs(user_id);
    this.setState({ clubs })
  }

  async getUserClubItem(club_id) {
    const club = await showUserClubItem(this.state.currentUser.id, club_id);
    this.setState({ club })
  }

  // Function to get all clubs across all user
  async getClub() {
    const club = await showClub();
    this.setState({ club })
  }

  // Function to get a single club item from our API
  async getClubItem(id) {
    const clubItem = await showClubItem(id);
    this.setState({ clubItem })
  }

  async deleteUser(currentUser) {
    await destroyUser(this.state.currentUser.id)
    this.handleLogout()
  }
  
  async addClub() {
    const newClub = await postClub(this.state.authFormData)
    this.setState(prevState => ({
      club: [...prevState.club, newClub],
      authFormData: {
        headline: "",
        brand: "",
        make: "",
        model: ""
      }
    }))
  }


  async updateClub(clubItem) {
    const updatedClubItem = await putClub(this.state.formData, clubItem.id);
    const index = this.state.club.indexOf(clubItem);
    const clubArray = this.state.club
    clubArray[index] = updatedClubItem
    this.setState({
      club: clubArray
    })
  }

  // Function to delete a club
  async deleteClub(clubItem) {
    await destroyClub(clubItem.id);
    const index = this.state.club.indexOf(clubItem);
    const clubArray = this.state.club
    clubArray.splice(index, 1);
    this.setState({
      club: clubArray
    })
  }

  
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
    // Do Not Touch!!!
    const userData = decode(token.token)
    this.setState({
      currentUser: userData
    })
    // console.log(userData.token)
    // Do Not Touch!!!
    localStorage.setItem("jwt", token.token)
    console.log('handle login user data', this.state.currentUser)
  }

  // Function to register a user
  // After register, we just call the login function with the same data
  async handleRegister() {
    await registerUser(this.state.authFormData);
    this.handleLogin()
  }

  // Function to logout user
  // We delete the token from local storage and set the current user in state back to null
  handleLogout() {
    localStorage.clear();
    this.setState({
      currentUser: null
    })
  }

  async handleUpdate() {
    console.log(this.state.currentUser.user_id)
    console.log(this.state.authFormData)
    const userData = await putUser(this.state.currentUser.user_id, this.state.authFormData)

    console.log("userdata", userData)
    this.setState({
      currentUser: userData
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
    console.log(this.state.authFormData)
  }

  
  async handleChange(currentUser) {
    const userData = await putUser(this.state.currentUser.id, this.state.authFormData)
    this.setState({
      currentUser: userData
    })
  }

  // Data in the form
  setClubForm(club) {
    this.setState({
      formData: {
        name: club.name,
        headline: club.headline,
        brand: club.brand,
        make: club.make,
        price: club.price
      }
    })
  }

  

  render() {
    return (
      <div>
        <header className="main_header_section">
          
          <Link to="/"><div className="main_logo">GBay</div>
          <h2 className="main_subtitle">Exclusive Dealer of Golf's Most Historic Golf Clubs</h2></Link>
         


          {this.state.currentUser
            ?
            <>
              <h3 className="welcome_title">Welcome to GBay: {this.state.currentUser && this.state.currentUser.email}
                    <button onClick={this.handleLogout} className='logout_button'>logout</button>
              </h3>
              <hr/>
              <div className='view_all_clubs'>
              <Link to={`users/${this.state.currentUser.id}/clubs`}>View All Clubs</Link>
              </div>
            </>
            :
            <button className="login_button" onClick={() => this.props.history.push('/login')}>
              Login/Register
            </button>
            
          }
            <LinkButton to="/update">Update</LinkButton>
            <button className="delete_button" onClick={this.destroyUser}>Delete</button>
            <button className="logout_button" onClick={this.handleLogout}>Logout</button>
           
            
          
        </header>
          
        {/* setting up our routes */}
        <Route exact path="/login" render={() => (
          <AuthForm
            authFormTitle="Login"
            handleSubmit={this.handleLogin}
            handleChange={this.authHandleChange}
            authFormData={this.state.authFormData} />)} 
            />

        <Route exact path="/register" render={() => (
          <AuthForm
            authFormTitle="Register"
            handleSubmit={this.handleRegister}
            handleChange={this.authHandleChange}
            authFormData={this.state.authFormData} />)} 
            />

<Route exact path="/update" render={() => (
          <UpdateForm
          updateFormTitle="Update"
          handleSubmit={this.handleUpdate}
          handleChange={this.authHandleChange}
          authFormData={this.state.authFormData} />)} 
          />
        {this.state.currentUser 
        ?
          <>
          <Route exact path={`/users/${this.state.currentUser.id}/clubs`} render={(props) => (
            <ShowClubs
              {...props}
              getUserClubs={this.getUserClubs}
              clubs={this.state.club}
              formData={this.state.formData}
              getClubItem={this.getClubItem}
              deleteClub={this.deleteClub}
              handleSubmit={this.addClub}
              handleChange={this.handleChange}
              setClubForm={this.setClubForm}
              updateClub={this.updateClub} />)} 
            />
            </>
            :
            ""
          }
        {/* <Route exact path="/update" render={() => (
          <UpdateForm
          updateFormTitle="Update"
          handleSubmit={this.handleUpdate}
          handleChange={this.authHandleChange}
          authFormData={this.state.authFormData} />)} 
          /> */}

        <Route exact path="/club/:id" render={(props) => 
          <ClubItem
            clubs={this.state.clubs}              
            />} 
          />
      </div>
    )
  }
}

export default withRouter(App);

