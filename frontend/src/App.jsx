import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoute from './routes/PrivateRoute';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Admin/Dashboard';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';

import MyTasks from './pages/User/MyTasks';
import UserDashboad from './pages/User/Dashboard';
import TaskDetails from './pages/User/TaskDetails';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          {/* ADMIN ROUTES */}
          <Route element={<PrivateRoute allwedRoles={['admin']} />} />
          <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/tasks' element={<ManageTasks />} />
          <Route path='/admin/create-task' element={<CreateTask />} />
          <Route path='/admin/users' element={<ManageUsers />} />

          {/* USER ROUTES */}
          <Route element={<PrivateRoute allwedRoles={['admin']} />} />
          <Route path='/user/dashboard' element={<UserDashboad />} />
          <Route path='/user/my-tasks' element={<MyTasks />} />
          <Route path='/user/task-details/:id' element={<TaskDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
