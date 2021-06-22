import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    border: `1px solid ${theme.palette.common.grey600}`,
    borderRadius: '0',
    padding: '0.5em 0',
    margin: '1em 0'
  },
  cardHeader: {
    color: 'black',
    cursor: 'pointer',
    '&:hover': {
      color: 'blue'
    }
  }
}));

const ReusableCard = ({ header, content, actions }) => {
  const classes = useStyles();

  return (
    <Card className={classes.cardContainer}>
      <CardHeader className={classes.cardHeader} title={header} />
      <CardContent>{content}</CardContent>
      <CardActions>{actions}</CardActions>
    </Card>
  );
};

export default ReusableCard;
