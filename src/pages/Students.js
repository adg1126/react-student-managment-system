import React from 'react';
import history from '../history';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ReusableCard from '../components/ReusableCard';
import EditStudentModalContainer from '../containers/students/EditStudentModalContainer';
import DeleteStudentContainer from '../containers/students/DeleteStudentModalContainer';
import AddStudentModalContainer from '../containers/students/AddStudentModalContainer';
import NotificationContainer from '../containers/NotificationContainer';

const useStyles = makeStyles(theme => ({
  mainContainer: {
    width: '100vw'
  },
  header: {
    marginBottom: '3em'
  },
  greenButton: {
    ...theme.button,
    ...theme.buttonGreenAnimation,
    fontSize: '1em',
    marginBottom: '1.5em'
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
  }
}));

const StudentCard = ({
  courseList,
  student,
  setModalOpen,
  setStudentToUpdate
}) => {
  const classes = useStyles();

  const handleDeleteStudent = () => {
    setModalOpen('deleteStudent', true);
    setStudentToUpdate(student);
  };

  const handleEditStudent = () => {
    setModalOpen('editStudent', true);
    setStudentToUpdate(student);
  };

  const getStudentCourses = () =>
    courseList.filter(({ docId }) =>
      student.courses.some(course => course === docId)
    );

  const cardContent = {
    header: (
      <Typography
        variant='h5'
        onClick={() => history.push(`/students/${student.docId}`)}
      >
        {student.fullName}
      </Typography>
    ),
    content: (
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography
            variant='body1'
            style={{ marginBottom: '0.5em' }}
          >{`Enrolled in: `}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {getStudentCourses().map(({ courseCode, courseName }, i) => (
              <ListItem key={i} dense>
                <ListItemText>
                  {courseCode} - {courseName}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
    ),
    actions: (
      <>
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
      </>
    )
  };

  return <ReusableCard {...cardContent} />;
};

const Students = ({
  status,
  courseList,
  studentList,
  errMessage,
  setModalOpen,
  setStudentToUpdate
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Grid
      container
      direction='row'
      justify='center'
      className={classes.mainContainer}
    >
      <Grid
        container
        direction='column'
        style={{ width: matchesSM ? '95%' : '40%', marginTop: '1em' }}
      >
        <Grid item className={classes.header}>
          <Typography variant='h4'>Student List</Typography>
        </Grid>
        <Grid item>
          <AddStudentModalContainer />
          <Button
            variant='outlined'
            className={classes.greenButton}
            startIcon={<PersonAddIcon />}
            onClick={() => setModalOpen('addStudent', true)}
          >
            Add Student
          </Button>
        </Grid>
        {studentList.length ? (
          studentList.map((student, i) => (
            <Grid item key={i}>
              <StudentCard
                courseList={courseList}
                student={student}
                setModalOpen={setModalOpen}
                setStudentToUpdate={setStudentToUpdate}
              />
            </Grid>
          ))
        ) : errMessage ? (
          <Grid item>
            <Typography variant='h4' style={{ color: 'red' }}>
              {errMessage}
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography>
              You currently have no students, add some now.
            </Typography>
          </Grid>
        )}
        <NotificationContainer status={status} />
      </Grid>
    </Grid>
  );
};

export default Students;
