import React, { Component } from 'react';
import logo from './wc_trophy.svg';
import './App.css';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Match, MatchCard } from './matches';


const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
  },
});

const initialState = {
  matches: [],
  loading: true,
  hasLoaded: false,
}

class App extends Component {
  
  constructor() {
    super()
    this.state = initialState;
  }
  
  componentWillMount() {
    axios.get('https://world-cup-json.herokuapp.com/matches/today')
      .then(res => this.setState({
        matches: res.data,
        hasLoaded: true,
        loading: false,
      }))
  }
  
  render() {
    let {
      matches, hasLoaded, loading
    } = this.state;
    let {
      classes
    } = this.props;
    
    let component = loading ? (<div>Loading.. </div>) : (<h3>Today's Matches</h3>)
    let matchesComponent = null;
    if (hasLoaded) {
      matchesComponent = matches.map((match) => {
        return (<MatchCard key={match.fifa_id} {...match} />);
        })
    }
    return (
      <div>
        
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">FIFA 2018 World Cup Coverage</h1>
          </header>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={9} md={6}>
              <p className="App-intro">
                    {component}
                    {matchesComponent}
                  </p>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);
