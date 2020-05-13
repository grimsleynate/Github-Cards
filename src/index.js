import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

//Test data in an array, used to make sure our cards fill out properly
const testData = [
  {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "Facebook"},
  {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Facebook"},
  {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
  {name: "Nathaniel Grimsley", avatar_url: "https://avatars3.githubusercontent.com/u/30242518?v=4", company: "Deadhead Media"}
];
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
    {/* .map() creates a new array out of an established array.
      This creates an array of Card components, and pushes an
      object from testData into each*/}
    {props.profiles.map(profile=><Card {...profile}/>)}
  </div>);
};

//Form manages user input
class Form extends React.Component {
  //every function comes with an event argument, you can name it whatever you want.  
  //this allows you to use native event-related functions
  handleSubmit = (event) => {
    //this prevents the page from refreshing when you submit.
    event.preventDefault();
    console.log();
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <input 
            type="text" 
            placeholder="Github username" 
            ref={this.userNameInput}
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
    profiles: testData,
  }

  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form />
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
