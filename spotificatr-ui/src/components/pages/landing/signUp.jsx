import React from 'react'
import { withRouter } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { withStyles } from '@material-ui/core'
import { emailRegex, passwordRegex } from '../../../util/regex'
import { signUp } from '../../../net/signUp'

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

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      emailInputError: '',
      password: '',
      passwordInputError: '',
      validationPassword: '',
      validationPasswordInputError: '',
      passwordIsCorrect: false
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleValidationPasswordChange = this.handleValidationPasswordChange.bind(this)
    this.toggleIsCorrect = this.toggleIsCorrect.bind(this)
    this.signUp = this.signUp.bind(this)
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

  handleValidationPasswordChange (event) {
    const { value: validationPassword } = event.target
    const { password } = this.state
    const validationPasswordInputError = []
    if (!validationPassword) validationPasswordInputError.push('required')
    if (validationPassword && !passwordRegex.test(validationPassword)) validationPasswordInputError.push('must be 8 characters, 1 upper, 1 lower, one special character')
    if (password !== validationPassword) validationPasswordInputError.push('passwords must match')
    this.setState({validationPassword, validationPasswordInputError: validationPasswordInputError.join(', ')})
  }

  toggleIsCorrect (event) {
    const { password } = this.state
    const { checked: passwordIsCorrect } = event.target
    this.setState({
      passwordIsCorrect,
      validationPassword: passwordIsCorrect ? password : ''
    }, () => {
      this.handleValidationPasswordChange({target: {value: passwordIsCorrect ? password : ''}})
    })
  }

  async signUp (event) {
    event.preventDefault()
    const { history } = this.props
    const { email, password, validationPassword } = this.state
    try {
      await signUp({email, password, validationPassword})
      history.push('/landing/signIn')
      // TODO: Success toast?
    } catch (error) {
      // TODO: Error toast?
    }
  }

  render () {
    const { classes, history } = this.props
    const { email, emailInputError, password, passwordInputError, validationPassword, validationPasswordInputError, passwordIsCorrect } = this.state
    return (
      <Container>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
          <Card className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign up
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
                id='password1'
                value={password}
                autoComplete='current-password'
                onChange={this.handlePasswordChange}
                helperText={passwordInputError}
                error={!!passwordInputError.length}
              />
              <FormControlLabel control={<Checkbox value={passwordIsCorrect} color='primary' onChange={this.toggleIsCorrect} />} label="I typed it correctly" />
              <TextField
                variant='outlined'
                margin='normal'
                required
                fullWidth
                name='password'
                label='Repeat Password'
                type='password'
                id='password2'
                value={validationPassword}
                autoComplete='current-password'
                onChange={this.handleValidationPasswordChange}
                helperText={validationPasswordInputError}
                error={!!validationPasswordInputError.length}
              />
              <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={this.signUp}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href='#' variant='body2' onClick={(e) => {
                    e.preventDefault()
                    history.push('/landing/signIn')}
                  }>
                    {'Already have an account? Sign In'}
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

export default withRouter(withStyles(styles)(SignUp))

