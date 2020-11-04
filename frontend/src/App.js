import React from 'react';
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
import CheckoutForm from './components/checkout/CheckoutForm';
import OrderState from './context/order/OrderState';
import OrderList from './components/orders/OrderList';

function App() {
	return (
		<AuthState>
			<ProductState>
				<CartState>
					<OrderState>
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
									{SetUser.getUser() ? (
										<Route excat path='/checkout' component={CheckoutForm} />
									) : (
										<Route exact path='/checkout'>
											<Redirect to='/home' />
										</Route>
									)}
									{SetUser.getUser() ? (
										<Route excat path='/myorders' component={OrderList} />
									) : (
										<Route exact path='/myorders'>
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
					</OrderState>
				</CartState>
			</ProductState>
		</AuthState>
	);
}

export default App;
