import React from 'react'
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import { emailRegex, passwordRegex } from '../../../util/regex'
import { login } from '../../../net/login'

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

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailInputError: '',
      password: '',
      passwordInputError: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  handleEmailChange (event) {
    const { value: email } = event.target
    const emailInputError = []
    if (!email) emailInputError.push('required')
    if (email && !emailRegex.test(email)) emailInputError.push('must be valid email')
    this.setState({email, emailInputError: emailInputError.join(', ')})
  }

  handlePasswordChange (event) {
    const { value: password } = event.target
    const passwordInputError = []
    if (!password) passwordInputError.push('required')
    if (password && !passwordRegex.test(password)) passwordInputError.push('must be 8 characters, 1 upper, 1 lower, one special character')
    this.setState({password, passwordInputError: passwordInputError.join(', ')})
  }

  async signIn (event) {
    event.preventDefault()
    const { history } = this.props
    const { email, password } = this.state
    try {
      const response = await login({email, password})
      const { token, connected } = response.details
      localStorage.setItem('sessionToken', token)
      if (connected) {
        history.push('/playlists')
      } else {
        history.push('/landing/connect')
      }
    } catch (error) {
      // TODO: Error toast?
    }
  }

  render () {
    const { classes, history } = this.props
    const { email, emailInputError, password, passwordInputError } = this.state
    return (
      <Container>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
          <Card className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={this.handleEmailChange}
                helperText={emailInputError}
                error={!!emailInputError.length}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password}
                autoComplete='current-password'
                onChange={this.handlePasswordChange}
                helperText={passwordInputError}
                error={!!passwordInputError.length}
              />
              <br />
              <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={this.signIn}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href='#' variant='body2' onClick={(e) => {
                    e.preventDefault()
                    history.push('/landing/signUp')}
                  }>
                    {'Don\'t have an account? Sign Up'}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Card>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(SignIn))

