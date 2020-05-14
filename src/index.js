import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

//Card component for holding all the information about each person.
const Card = (props) => {
  const profile = props;
  return (
    <div className="github-profile">
      <img src={profile.avatar_url} alt=""/>
      <div className="info">
        <div className="name">{profile.name}</div>
        <div className="company">{profile.company}</div>
      </div>
    </div>
  );
};

//CardList component that returns an array of Cards
const CardList = (props) => {
  return (
  <div> 
    {props.profiles.map(profile=><Card key={profile.id} {...profile}/>)}
  </div>);
};

//Form manages user input
const Form = (props) => {
  const [userName, setUserName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${userName}`)
        .catch(error404 => {
          alert('That username does not exist, please try a different one.')
          setUserName('');
        });
        props.onSubmit(resp.data);
        setUserName('');
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={userName}
          onChange={event => setUserName(event.target.value)}
          placeholder="Github username" 
          required 
        />
        <button>Add Card</button>
      </form>
    </div>
  );
};

//App is going to be the container for the whole app.

const App = (props) => {
  const [profiles, setProfiles] = useState([]);

  const addNewProfile = (profileData) => {
    setProfiles([...profiles, profileData]
    );
  };

  return (
    <div>
      <div className="header">{props.title}</div>
      <Form onSubmit={addNewProfile} />
      <CardList profiles={profiles} />
    </div>
  );
};

ReactDOM.render(
  <App title="The Github Cards App" />,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
