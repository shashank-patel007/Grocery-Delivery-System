import React, { useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import AuthState from './context/auth/AuthState';
import ProductList from './components/products/ProductList';
import CartState from './context/cart/CartState';
import Cart from './components/cart/Cart';
import { SetUser } from './services/storage.service';
import ProductState from './context/product/ProductState';
import CategoryList from './components/categories/CategoryList';

function App() {
	return (
		<AuthState>
			<ProductState>
				<CartState>
					<Router>
						<div className='App'>
							<Header />
							<Navbar />
							<Switch>
								{SetUser.getUser() ? (
									<Route excat path='/cart' component={Cart} />
								) : (
									<Route exact path='/cart'>
										<Redirect to='/home' />
									</Route>
								)}
								<Route excat path='/home'>
									<CategoryList />
									<ProductList />
								</Route>
								<Route exact path='/'>
									<Redirect to='/home' />
								</Route>
							</Switch>
						</div>
					</Router>
				</CartState>
			</ProductState>
		</AuthState>
	);
}

export default App;
