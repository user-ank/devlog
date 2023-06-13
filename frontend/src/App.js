import Header from './components/Header/Header';
import Home from './components/pages/HomePage/Home';
import Events from './components/pages/Events';
import Groups from './components/pages/Groups';
import Notifications from './components/pages/Notifications';
import Login from './components/pages/Authentication/login'
import NotFound from './components/pages/NotFound';
import Users from './components/Users';
import PersistLogin from './components/PersistLogin';

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './context/auth';
import RequireAuth from './context/RequireAuth';
import Profile from './components/pages/Profile';
import BlogPage from './components/pages/BlogPage';
import User from './components/pages/UserPage/User';
import Signup from './components/pages/Authentication/Signup';
import Bookmark from './components/pages/BookmarkPage/Bookmark';
import Account from './components/pages/AccountSetting/Account';

function App() {
  return (
    <div>
      <AuthProvider>

        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/devlog" />} />
          <Route path='/devlog/signup' element={<Signup />} />
          <Route path='/devlog/login' exact element={<Login />} />

          <Route element={<PersistLogin />}>
            <Route path='/devlog' exact element={<Home />} />
            <Route path='/devlog/events' element={<RequireAuth><Events /></RequireAuth>} />
            <Route path='/devlog/users' element={<RequireAuth><Users /></RequireAuth>} />
            <Route path='/devlog/groups' element={<RequireAuth><Groups /></RequireAuth>} />
            <Route path='/devlog/notifications' element={<RequireAuth><Notifications /></RequireAuth>} />
            <Route path='/devlog/profile' element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path='/devlog/bookmarks' element={<RequireAuth><Bookmark /></RequireAuth>} />
            <Route path='/devlog/:username/' element={<User />} />
            <Route path='/devlog/account' element={<RequireAuth><Account isUsersProfile={true}/></RequireAuth>} />
          </Route>
          <Route path='/devlog/:username/:blogTitle' element={<BlogPage />} />
          <Route path='/devlog/account/:username' element={<Account isUsersProfile={false}/>} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>




    </div>
  );
}

export default App;
