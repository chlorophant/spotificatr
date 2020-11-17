import React from 'react'
import { Switch, Route, withRouter, Redirect } from 'react-router-dom'
import LandingPage from './pages/landing/landing'
import PlaylistsPage from './pages/playlists'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import logo from '../assets/spotificatr.png'

const appBarPaths = ['/playlists']

const styles = theme => {
  return ({
    root: {
      display: 'flex'
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen/ 1.5,
      })
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    grow: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    content: {
      flexGrow: 1
    },
    listItemHover: {
      '&:hover': {
        backgroundColor: theme.palette.secondary.light
      }
    }
  })
}

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.logout = this.logout.bind(this)
  }

  logout() {
    const { history } = this.props
    localStorage.removeItem('sessionToken')
    history.push('/landing')
  }

  renderAppBar() {
    const { classes, location } = this.props
    const { pathname } = location

    if (appBarPaths.includes(pathname)) {
      return (
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <span style={{height: '30px'}}>
              <img style={{width: '30px'}} src={logo} alt='Spotificatr Logo' />
            </span>
            <Typography className={classes.title} variant='h6' color='inherit' noWrap>
              Spotificatr
            </Typography>
            <div className={classes.grow} />
            <div>
              <IconButton onClick={this.logout} color='inherit'>
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      )
    }
  }

  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.renderAppBar()}
        <main className={classes.content}>
          <Switch>
            <Route path='/landing'>
              <LandingPage />
            </Route>
            <Route path='/playlists'>
              <PlaylistsPage />
            </Route>
            <Redirect to='landing' />
          </Switch>
        </main>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Layout))
