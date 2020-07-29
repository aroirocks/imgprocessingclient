import React from 'react';
import './App.css';
import Navbar from './components/NavBar/Navbar';
import MainContainer from './components/containers/MainContainer';
import Footer from './components/Footer/Footer';
import store from './store';
import { Provider } from 'react-redux';
import BottonRibbon from './components/BottomRIbbon/BottomRibbon';
function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Navbar />
        <MainContainer />
        <BottonRibbon />
      </div>
    </Provider>
  );
}

export default App;
