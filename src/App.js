import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import AddTask from './tasks/AddTask';
import TaskList from './tasks/TaskList';
import UpdateTask from './tasks/UpdateTask';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';

function App(){

    return (
      <Router>
        <Routes>
          <Route path='/' element = {<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path = '/register' element={<Register/>}/>
          <Route path = '/add-task' element={<AddTask/>}/>
          <Route path = '/list-task' element={<TaskList/>}></Route>
          <Route path='/update-task' element={<UpdateTask/>}></Route>
        </Routes>
      </Router>
    )
}
export default App;
