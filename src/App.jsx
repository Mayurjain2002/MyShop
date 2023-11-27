import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from './pages/home/Home';
import Order from './pages/order/Order';
import Cart from './pages/cart/Cart';
import Dashboard from './pages/admin/dashboard/Dashboard';
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/ProductInfo';
import AddProduct from './pages/admin/page/AddProduct';
import UpdateProduct from './pages/admin/page/UpdateProduct';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Allproducts from './pages/allproducts/Allproducts';
import Contact from './pages/contact/Contact';

const App = () => {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={
          <Protected>
            <Order />
          </Protected>
        } />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/*' element={<Nopage />} />
        <Route path='/dashboard' element={
          <ForAdmin>
            <Dashboard />
          </ForAdmin>
        } />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/productinfo/:id'  element={<ProductInfo />}/>
        <Route path='/addproduct' element={
          <ForAdmin>
            <AddProduct />  
        </ForAdmin>
        } />
        <Route path='/updateproduct' element={
          <ForAdmin>
            <UpdateProduct />
        </ForAdmin>
        } />
        <Route path='/allproducts' element={<Allproducts />} />
      </Routes>
      <ToastContainer />
    </Router>
    </MyState>
  )
}

export default App

export const Protected = ({children}) =>{
  const user = localStorage.getItem('user')
  if(user){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}

export const ForAdmin = ({children}) =>{
  const admin = JSON.parse(localStorage.getItem('user'))
  if(admin.user.email === 'mj123@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'} />
  }
}