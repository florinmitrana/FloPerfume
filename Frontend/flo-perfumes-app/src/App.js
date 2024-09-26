import React from 'react';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Homescreen from './Screens/Homescreen';
import RecommendationsScreen from './Screens/RecommendationsScreen'
import HeaderNavbar from './components/HeaderNavbar';
import InformationScreen from './Screens/InformationScreen';
import LoginScreen from './Screens/LoginScren';
import Footer from './components/Footer';
import FavoriteScreen from './Screens/FavoriteScreen';
import UserInfoScreen from './Screens/UserInfoScreen';
import AddPerfumeScreen from './Screens/AddPerfumeScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomescreenTest from './Screens/HomescreenTest';
import RegisterScreenTest from './Screens/RegisterScreenTest';
import LoginScreenTest from './Screens/LoginScreenTest';


function App() {
  return(
    <div className='App'>
      <Router>
      <Navbar/>
      
    <Routes>

      <Route path="/" element={<Hero/>} />
      <Route path = "/home" element={<HomescreenTest/>}/>
      <Route path="/:perfumeId/recommandations" element={<RecommendationsScreen/>} />
      <Route path="/:perfumeId/details" element={<InformationScreen/>} />
      <Route path ="/register" element = {<RegisterScreenTest/>} />
      <Route path ="/login" element= {<LoginScreenTest/>} />
      <Route path = "/favorites" element= {<FavoriteScreen/>} />
      <Route path = "/account" element={<UserInfoScreen/>}/>
      <Route path = "/addPerfume" element={<AddPerfumeScreen/>} />

    </Routes>
    <Footer/>
    </Router>
    </div>

  );
  
}

export default App;
