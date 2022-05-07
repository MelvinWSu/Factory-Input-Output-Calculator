import logo from './logo.svg';
/*
import './App.scss';
*/

import 'bootstrap/dist/css/bootstrap.min.css';
import './Custom.css';

import Comparison from './Comparison';
import SignInScreen from './firebaseui';
import CodeTest from './CodeTest'
import CreateItemPage from './CreateItemPage'
import CreateRecipePage from './CreateRecipePage'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Comparison/>} />
        <Route path = "/signin" element={<SignInScreen/>}/>
        <Route path = "/createItem" element={<CreateItemPage/>}/>
        <Route path = "/createRecipe" element={<CreateRecipePage/>}/>
        <Route path = "/test" element={<CodeTest/>}/>
      </Routes>
    </Router>
  )
}