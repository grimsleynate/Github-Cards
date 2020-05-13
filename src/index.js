import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//Card component for holding all the information about each person.
class Card extends React.Component {
  render () {
    const profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url}/>
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

//CardList component that returns an array of Cards
const CardList = (props) => {
  return (<div> 
    {/* .map() creates a new array out of an established array
      This creates an array of Card components, and pushes an
      object from testData into each*/}
    {props.profiles.map(profile=><Card key={profile.id} {...profile}/>)}
  </div>);
};

//Form manages user input
class Form extends React.Component {
  state = { userName: '',}
  //every function comes with an event argument, you can name it whatever you want.  
  //this allows you to use native event-related functions
  handleSubmit = async (event) => {
    //this prevents the page from refreshing when you submit.
    event.preventDefault();
    const resp = await 
      axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            value={this.state.userName}
            onChange={event => this.setState({userName: event.target.value})}
            placeholder="Github username" 
            required 
          />
          <button>Add Card</button>
        </form>
      </div>
    );
  }
}

//App is going to be the container for the whole app.
class App extends React.Component {
  state = {
    profiles: [],
  }

  addNewProfile = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData]
    }))
  };

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

ReactDOM.render(
  <App title="The Github Cards App" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
