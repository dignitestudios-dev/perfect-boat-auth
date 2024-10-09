import './App.css'
import { Route, Routes } from 'react-router-dom';
import Package from './pages/Package';
import AddCard from './pages/AddCard';
import Summary from './pages/Summary';
import Congratulations from './pages/Congratulations';
import Signup from './pages/Signup';
import OnboardVerifyOtp from './pages/OnboardVerifyOtp';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path='/buy-package' element={<Package />}/>
      <Route path='/add-card' element={<AddCard />}/>
      <Route path='/summary' element={<Summary />}/>
      <Route path='/congrats' element={<Congratulations />}/>
      <Route path='/' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/onboard-verify-otp' element={<OnboardVerifyOtp />}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
  )
}

export default App
