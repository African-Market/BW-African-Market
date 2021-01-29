import './App.css';
import Signup from './components/Signup';
import { Link, Route } from 'react-router-dom';



function App() {

  return (
        <div className="App">
                <nav>
                     <h1>AFRICAN MARKETPLACE</h1>
                     <div className="navlinks">
               
                        <Link to="/signup">Sign Up</Link>
                     </div>                
                </nav>
                <div className="routeDiv">
 
                    <Route path="/signup" component={Signup} />
                </div>
                


        </div>

    
  );
}

export default App;
