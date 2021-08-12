import './App.css';
import Components from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//importing css dependencies for line chart
import 'bootstrap/dist/css/bootstrap.min.css';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

/**
 * Main App function that includes 'Components' component at '/' route
 *
 * @returns 'Components' that includes both the sidebar and map
 */
function App() {
  return (
    <div className='App'>
      <Router>
        <Route path='/' component={Components}></Route>
      </Router>
    </div>
  );
}

export default App;
