import React from 'react'
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import LinkIcon from '@material-ui/icons/Link'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import queryString from 'query-string'
import { connectSpotify } from '../../../net/connect'

const styles = (theme) => {
  return ({
    paper: {
      padding: theme.spacing(5),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '90%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
  })
}

class ConnectAccount extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount () {
    const { history, location } = this.props
    const values = queryString.parse(location.search)
    if (values.code) {
      try {
        const sessionToken = localStorage.getItem('sessionToken')
        await connectSpotify({code: values.code, sessionToken})
        history.push('/playlists')
      } catch (error) {
        // TODO: Display error toast?
      }
    }
  }

  render () {
    const { classes } = this.props
    return (
      <Container>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
          <Card className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LinkIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Connect Spotify Account
            </Typography>
            <br />
            <Typography color='secondary' variant='subtitle1'>
              Spotificatr requires spotify to be linked to your account
              <br />
            </Typography>
            <form className={classes.form} noValidate>
              <Button fullWidth variant='contained' color='primary' className={classes.submit} href='https://accounts.spotify.com/authorize?response_type=code&client_id=93b6cab01c8a41bfa618d012429e9f6b&redirect_uri=http://localhost:8080/landing/connect'>Connect</Button>
            </form>
          </Card>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(ConnectAccount))

