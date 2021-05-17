import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Attendance from '../pages/Attendance';
import Classes from '../pages/Classes';
import Assignments from '../pages/Assignments';
import Schedule from '../pages/Schedule';
import NavBar from './NavBar/NavBar';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/attendance' component={Attendance} />
          <Route path='/classes' component={Classes} />
          <Route path='/assignments' component={Assignments} />
          <Route path='/schedule' component={Schedule} />
        </Switch>
      </NavBar>
    </BrowserRouter>
  );
}
