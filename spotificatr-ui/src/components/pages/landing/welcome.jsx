import React from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core'

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

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render () {
    const { classes, history } = this.props
    return (
      <Container>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center' style={{ minHeight: '100vh' }}>
          <Typography color='primary' variant='h1' component='h1'>
            Spotificatr
          </Typography>
          <Typography color='primary' variant='h4' component='h4'>
            Next level playlist notes
          </Typography>
          <br />
          <Button className={classes.getStartedButton} variant='outlined' size='large' color='primary' onClick={(e) => {
            e.preventDefault()
            history.push('/landing/signUp')}
          }>Get Started</Button>
          <Typography color='primary' variant='subtitle1'>
            Already a member? &nbsp;
            <Link href='#' onClick={(e) => {
              e.preventDefault()
              history.push('/landing/signIn')
            }} className={classes.link} underline='always'>Sign In</Link>
          </Typography>
        </Grid>
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(Welcome))

