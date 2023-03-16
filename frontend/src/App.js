import Header from './components/Header/Header';
import Home from './components/pages/HomePage/Home';
import Events from './components/pages/Events';
import Groups from './components/pages/Groups';
import Notifications from './components/pages/Notifications';
import Login from './components/pages/login'
import NotFound from './components/pages/NotFound';

import {Routes, Route, Navigate} from "react-router-dom";
import { AuthProvider } from './context/auth';
import RequireAuth from './context/RequireAuth';
import Profile from './components/pages/Profile';
import BlogPage from './components/pages/BlogPage';
import User from './components/pages/UserPage/User';

function App() {
  return (
    <div>
      <AuthProvider>

        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to="/devlog" />}/>
          <Route path='/devlog' exact  element={<Home/>}/>
          <Route path='/devlog/login' exact  element={<Login/>}/>
          <Route path='/devlog/events' element={<RequireAuth><Events/></RequireAuth>}/>
          <Route path='/devlog/groups' element={<RequireAuth><Groups/></RequireAuth>}/>
          <Route path='/devlog/notifications' element={<RequireAuth><Notifications/></RequireAuth>}/>
          <Route path='/devlog/profile' element={<RequireAuth><Profile/></RequireAuth>}/>
          <Route path='/devlog/:username/' element={<User/>} />
          <Route path='/devlog/:username/:blogTitle' element={<BlogPage/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
        

   
         
    </div>    
  );
}

export default App;
