import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import LoginRegister from './components/loginRegister/LoginRegister';
<<<<<<< HEAD
import ProductList from './components/products/ProductList';
=======
// import ProductList from './components/products/ProductList';
>>>>>>> 419875f533d801a8b9c127973d1c58ced862e8ec

function App() {
	return (
		<Router>
			<div className='App'>
				<Header />
				<Navbar />
				{/* <ProductList /> */}
			</div>
		</Router>
	);
}

export default App;
