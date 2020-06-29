import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IArticle } from '../../../../appservices/interface/IArticle';
import * as moment from 'moment';

const _defaultImage: string = require("../../../../../assets/news.jpg");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
      cursor: 'pointer',
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor:  '#21ce99',
    },
    headercontent: {
     color: '#21ce99',
     fontFamily: 'Open Sans',
     fontSize: '0.875rem',
    },
    contentdesc: {
     fontFamily: 'Open Sans',
     fontSize: '0.875rem',
    },
    contentsourcename: {
     fontFamily: 'Open Sans',
     fontSize: '0.875rem',
     color: '#21ce99',
     marginTop: '10px',
     marginBottom: '0px',
    },
  }),
);

const addToFavorites = (): void => {
 alert('Add to favorites');
};

const shareNews = (): void => {
 alert('Share News');
};


export const GlobalnewsTile = (props: { article : IArticle }) => {
  let { article } = props;

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card 
    className={classes.root}
    >
      <CardHeader
        avatar={
          <Avatar aria-label="author" className={classes.avatar}>
            {article.author ? (article.author).charAt(0) : 'R'}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={article.author}
        subheader={moment(article.publishedAt).utc().format('MMMM DD YYYY')}
      />
      <CardMedia
        className={classes.media}
        image={article.urlToImage ? article.urlToImage : _defaultImage}
        title="news image"
        onError={ev => {
            ev.currentTarget.setAttribute("src", _defaultImage);
        }}
        onClick={ev => {
        ev.preventDefault();
        window.open(article.url, "_blank");
    }}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.contentdesc}>
          {article.title}
        </Typography>
        <Typography paragraph className={classes.contentsourcename}>{article.source.name}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addToFavorites}>
          <FavoriteIcon  />
        </IconButton>
        <IconButton aria-label="share"  onClick={shareNews}>
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph className={classes.headercontent}>Content:</Typography>
          <Typography paragraph className={classes.contentdesc}>
            {article.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};