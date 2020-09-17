import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import AuthState from './context/auth/AuthState';
import ProductList from './components/products/ProductList';

function App() {
	return (
		<AuthState>
			<Router>
				<div className='App'>
					<Header />
					<Navbar />
					<ProductList />
				</div>
			</Router>
		</AuthState>
	);
}

export default App;
