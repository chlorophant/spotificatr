# NOTE:
**This project has not been maintained for several years, and likely has succumbed to "code rot" aka doubtful that it will run.**


# Take Home Code Test

### Project Requirements 
**Build an app that connects to the Spotify or GitHub API. The app should do the following:**
- Authenticate with the chosen API.
- Pull a list of your albums (or repositories) and display them in a list view.
- When you tap one, it will open a form that allows you to add your own notes.
    - This form will post to a dummy API endpoint using https://jsonplaceholder.typicode.com/guide.html that you must create.
    - Alternatively, you may use an API endpoint of your choosing or creation if that suits you.

### Project Guidelines
- Use the GraphQL endpoint provided for querying data. If you're not comfortable with GraphQL yet, you can use the alternative REST endpoint.
- You may use Create React App, Expo, or Next.js.
- Send us a zip of your code (or Github repository link) when completed.

### Resources
- Spotify GraphQL console: https://spotify-api-graphql-console.herokuapp.com/
- Spotify REST api: https://developer.spotify.com/console/browse/
- GitHub GraphQL console: https://developer.github.com/v4/explorer/
- GitHub REST docs: https://developer.github.com/v3/guides/getting-started/
- POST endpoints for creating notes:
    - https://jsonplaceholder.typicode.com/guide.html (scroll to "Create a Resource")
- Us! Don't hesitate to reach out with any questions regarding this mini-project.

### Notes from the developer
- Ultimately I decided to use parceljs instead of something like next.js because I find it 
much easier to use in general, while still supporting a lot of the things you would expect 
from a more complicated webpack build. Simplicity meets functionality.
- I decided not to use the GraphQL console despite being interested. The reason is because 
it seems that it doesn't have any documentation around handling of spotify access tokens, 
and furthermore it seems to not be an official spotify api, which is concerning. I didn't 
want to pass sensitive data through a third party.

# Project Documentation
 
**This project is a monorepo for simplicity of local development**

## Requirements:
 - Docker
 - Make
 - A Spotify account with saved playlists
 - An internet connection
 
## Getting Started

Do `make up` to build and run the containerized applications with the local env variables. Automatically runs the migrations on your database.
Do `make tail` after the containers are running in order to see log output

Goto `http://localhost:8080/` in your browser to see the running app (includes front end, back end, and database)!

## Cleanup

Do `make down` to shutdown the containers
Do `make clean` to remove all containers
