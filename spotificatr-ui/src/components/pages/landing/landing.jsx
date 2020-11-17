import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import BackgroundVideo from '../../../assets/background.mp4'
import { withStyles } from '@material-ui/core'
import ConnectAccount from './connectAccount'
import SignIn from './signIn'
import SignUp from './signUp'
import Welcome from './welcome'

const styles = () => {
  return ({
    getStartedButton: {
      minWidth: '300px',
      maxWidth: '300px',
      fontSize: '20px'
    },
    videoBackground: {
      position: 'fixed',
      right: 0,
      bottom: 0,
      minWidth: '100%',
      minHeight: '100%',
      transform: 'translateX(calc((100% - 100vw) / 2))',
      zIndex: '-1',
      filter: 'brightness(70%)'
    }
  })
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const { classes, history } = this.props
    return (
      <div>
        <video className={classes.videoBackground} loop autoPlay muted>
          <source src={BackgroundVideo} type='video/mp4' />
        </video>
        <Switch>
          <Route path='/landing/welcome'>
            <Welcome />
          </Route>
          <Route path='/landing/signUp'>
            <SignUp />
          </Route>
          <Route path='/landing/signIn'>
            <SignIn />
          </Route>
          <Route path='/landing/connect'>
            <ConnectAccount />
          </Route>
          <Redirect to='/landing/welcome' />
        </Switch>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(LandingPage))

