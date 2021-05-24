import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%'
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
  },
  linkButton: {
    color: theme.palette.secondary.main,
    borderRadius: 0,
    borderBottom: `1px solid ${theme.palette.secondary.main}`,
    zIndex: 1,
    '&:hover': {
      color: theme.palette.secondary.light,
      borderBottom: `1px solid ${theme.palette.secondary.light}`,
      backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
  }
}));

const ClassCard = ({ courseCode, courseName, deleteClass }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant='body1' component='h2'>
            {`${courseCode} - ${courseName}`}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={() => deleteClass(courseCode)}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          component={Link}
          to={`/classes/${courseCode}`}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const ClassListCard = ({ classList, deleteClass }) => {
  const classes = useStyles();

  return classList.length ? (
    <Grid
      container
      direction='column'
      spacing={3}
      className={classes.mainContainer}
    >
      {classList.map((classObj, i) => (
        <Grid item key={i}>
          <ClassCard {...classObj} deleteClass={deleteClass} />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>You currently have no classes, add some now.</Typography>
  );
};

export default ClassListCard;
