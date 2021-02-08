import './App.css';
import Register from './components/Register';
import { Link, Route } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import Login from './components/Login';



function App() {

  return (
        <div className="App">
            <nav>
                <h1>AFRICAN MARKETPLACE</h1>
                <div className="navlinks">
                    <Link to="/">Home</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  
                     
                </div>                
            </nav>
            <div className="routeDiv">
                <Route exact path="/" component={Home} />
                <Route path="/register" component={Register} />  
                <Route path="/login" component={Login} />
                <Route path="/profile/:id" component={Profile} />
            </div>
        </div>

    
  );
}

export default App;
