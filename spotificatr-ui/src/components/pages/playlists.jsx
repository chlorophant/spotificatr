import React from 'react'
import { withRouter } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Pagination from 'material-ui-flat-pagination'
import { withStyles } from '@material-ui/core'
import { getPlaylists } from '../../net/getPlaylists'
import { addNote } from '../../net/addNote'
import PlayListTile from '../playListTile'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import defaultPlaylistArt from '../../assets/music_note.jpg'

const styles = () => {
  return ({
    playlistsContent: {
      marginTop: '80px'
    }
  })
}

class PlaylistsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playLists: [],
      offset: 0,
      totalRecords: 1,
      limit: 8,
      dialogOpen: false,
      dialogName: '',
      dialogNote: '',
      inEditMode: false,
      currentPlaylistId: ''
    }
    this.handlePageChange = this.handlePageChange.bind(this)
    this.renderDialog = this.renderDialog.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.openDialog = this.openDialog.bind(this)
    this.enterEditMode = this.enterEditMode.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.saveNote = this.saveNote.bind(this)
    this.inputUpdated = this.inputUpdated.bind(this)
    this.refreshCurrentPage = this.refreshCurrentPage.bind(this)
  }

  async componentDidMount () {
    try {
      const { history } = this.props
      const { offset, limit } = this.state
      const sessionToken = localStorage.getItem('sessionToken')
      if (!sessionToken) {
        // User is not logged in, redirect them
        history.push('/landing/signIn')
      }
      const result = await getPlaylists({sessionToken, offset, limit})
      console.log('RESULT:', result)
      this.setState({playLists: result.details.playLists, totalRecords: result.details.totalRecords})
    } catch (error) {
      console.error(error)
      // TODO: Display error toast?
    }
  }

  async handlePageChange (event, offset) {
    const { limit } = this.state
    const sessionToken = localStorage.getItem('sessionToken')
    const result = await getPlaylists({sessionToken, offset, limit})
    this.setState({playLists: result.details.playLists, totalRecords: result.details.totalRecords, offset})
  }

  async saveNote () {
    const { currentPlaylistId, dialogNote } = this.state

    try {
      const sessionToken = localStorage.getItem('sessionToken')
      await addNote({sessionToken, noteContent: dialogNote, playlistId: currentPlaylistId})
      this.handleClose()
      await this.refreshCurrentPage()
    } catch (error) {
      // TODO: Error toast?
    }
  }

  async deleteNote () {
    const { currentPlaylistId } = this.state

    try {
      const sessionToken = localStorage.getItem('sessionToken')
      await addNote({sessionToken, noteContent: '', playlistId: currentPlaylistId})
      this.handleClose()
      await this.refreshCurrentPage()
    } catch (error) {
      // TODO: Error toast?
    }
  }

  handleClose () {
    this.setState({
      dialogOpen: false,
      dialogName: '',
      inEditMode: false,
      dialogNote: ''
    })
  }

  async refreshCurrentPage () {
    const { limit, offset } = this.state
    const sessionToken = localStorage.getItem('sessionToken')
    const result = await getPlaylists({sessionToken, offset, limit})
    this.setState({playLists: result.details.playLists, totalRecords: result.details.totalRecords, offset})
  }

  openDialog ({name, note, id}) {
    return () => {
      this.setState({
        dialogOpen: true,
        dialogName: name,
        dialogNote: note ? note.text : '',
        currentPlaylistId: id
      })
    }
  }

  enterEditMode () {
    this.setState({inEditMode: true})
  }

  inputUpdated (event) {
    const newNote = event.target.value
    this.setState({
      dialogNote: newNote
    })
  }

  renderDialog () {
    const { dialogOpen, dialogName, dialogNote, inEditMode } = this.state
    const { classes } = this.props
    let button

    if (inEditMode) {
      button = ([
        <Button variant='contained' color='secondary' className={classes.submit} onClick={this.deleteNote}>Delete</Button>,
        <Button variant='contained' color='primary' className={classes.submit} onClick={this.saveNote}>Save Notes</Button>
      ])
    } else {
      if (dialogNote) {
        button =<Button variant='contained' color='primary' className={classes.submit} onClick={this.enterEditMode}>Edit Notes</Button>
      } else {
        button = <Button variant='contained' color='primary' className={classes.submit} onClick={this.enterEditMode}>Add Notes</Button>
      }
    }

    return (
      <Dialog fullWidth open={dialogOpen} onClose={this.handleClose}>
        <DialogTitle>Notes for {dialogName}</DialogTitle>
        <DialogContent>
          {inEditMode ?
            <TextField value={dialogNote} autoFocus margin='dense' id='note' label='Note to save' type='text' fullWidth onChange={this.inputUpdated} /> :
            <DialogContentText>{dialogNote ? dialogNote : 'no notes available'}</DialogContentText>
          }
        </DialogContent>
        <DialogActions>
          {button}
        </DialogActions>
      </Dialog>
    )
  }

  render () {
    const { playLists, totalRecords, offset, limit } = this.state
    const { classes } = this.props
    return (
      <Container className={classes.playlistsContent}>
        <Grid container spacing={0} direction='column' alignItems='center' justify='center'>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography color='primary' variant='h2' component='h2'>
              Playlists
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <br />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Pagination
              limit={limit}
              offset={offset}
              total={totalRecords}
              onClick={this.handlePageChange}
            />
          </Grid>
          <Grid container margin={500} spacing={3} direction='row' alignItems='center' justify='center'>
            {
              playLists.map(playList => {
                const { name, images, id, note } = playList
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={id} onClick={this.openDialog({name, note, id})}>
                    <PlayListTile name={name} image={images.length ? images[0].url : defaultPlaylistArt} id={id} note={note ? note.text : ''} />
                  </Grid>
                )
              })
            }
          </Grid>
        </Grid>
        {this.renderDialog()}
      </Container>
    )
  }
}

export default withRouter(withStyles(styles)(PlaylistsPage))

