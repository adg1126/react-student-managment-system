import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';

import EditStudentModalContainer from '../../containers/students/EditStudentModalContainer';
import DeleteStudentContainer from '../../containers/students/DeleteStudentModalContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100%'
  },
  cardContainer: {
    border: `1px solid ${theme.palette.common.grey600}`,
    padding: '0.5em 0'
  },
  cardContent: {
    cursor: 'pointer',
    '&:hover': {
      color: 'blue'
    }
  },
  redButton: {
    ...theme.button,
    ...theme.buttonRedAnimation,
    fontSize: '1em'
  },
  indigoButton: {
    ...theme.button,
    ...theme.buttonIndigoAnimation,
    fontSize: '1em'
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

const StudentCard = ({ student, setModalOpen, setStudentToUpdate }) => {
  const classes = useStyles();

  const handleDeleteStudent = () => {
    setModalOpen('deleteStudent', true);
    setStudentToUpdate(student);
  };

  const handleEditStudent = () => {
    setModalOpen('editStudent', true);
    setStudentToUpdate(student);
  };

  return (
    <Card className={classes.cardContainer}>
      <CardContent className={classes.cardContent}>
        <Typography variant='body1' component='h2'>
          {student.fullName}
        </Typography>
      </CardContent>
      <CardActions>
        <DeleteStudentContainer />
        <EditStudentModalContainer />
        <Button
          variant='outlined'
          className={classes.redButton}
          startIcon={<HighlightOffIcon />}
          onClick={handleDeleteStudent}
        >
          Remove
        </Button>
        <Button
          variant='outlined'
          className={classes.indigoButton}
          startIcon={<EditIcon />}
          onClick={handleEditStudent}
        >
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

const StudentListCard = ({ studentList, setModalOpen, setStudentToUpdate }) => {
  const classes = useStyles();

  return studentList.length ? (
    <Grid
      container
      direction='column'
      spacing={3}
      className={classes.mainContainer}
    >
      {studentList.map(student => (
        <Grid item key={student.docId}>
          <StudentCard
            student={student}
            setModalOpen={setModalOpen}
            setStudentToUpdate={setStudentToUpdate}
          />
        </Grid>
      ))}
    </Grid>
  ) : (
    <Typography>You currently have no student, add some now.</Typography>
  );
};

export default StudentListCard;
