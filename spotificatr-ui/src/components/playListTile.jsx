import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    backgroundColor: 'white'
  },
  cardContent: {
    color: 'black',
    minHeight: '100px'
  },
  cardMedia: {
    height: '200px',
    width: '100%',
  },
  cardMediaWrapper: {
    display: 'flex',
    justifyContent:'center'
  }
})

class PlayListTile extends React.Component {
  render () {
    const { classes, name, image, note } = this.props
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <div className={classes.cardMediaWrapper}>
            <CardMedia className={classes.cardMedia} src={image} title={name} component='img' />
          </div>
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom component='h3'>
              {name}
            </Typography>
            <Typography variant='caption' component='p'>
              {note}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}

export default withRouter(withStyles(styles)(PlayListTile))
