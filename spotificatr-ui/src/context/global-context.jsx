import React from 'react';
// import { api } from '../net'

const GlobalContext = React.createContext({})

class GlobalContextProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlists: []
    }
    this.loadPlaylists = this.loadPlaylists.bind(this)
  }

  async loadPlaylists(item) {
    // const playlistsResponse = JSON.parse(await api.playlist.getPlaylists())
    // this.setState({
    //   playlists: playlistResponse.details
    // })
  }

  render() {
    return (
      <GlobalContext.Provider value={{playlists: this.state.playlists, loadPlaylists: this.loadPlaylists}}>
        {this.props.children}
      </GlobalContext.Provider>
    )
  }
}

export {
  GlobalContext,
  GlobalContextProvider
}