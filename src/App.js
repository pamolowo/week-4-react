
import WebsiteBody from './components/WebsiteBody';
import './App.css'
import { Routes, Route, Link} from 'react-router-dom';
import  MoreInfo  from './components/MoreInfo';
import NotFound from './components/NotFound';

function App() {

  return (
    <div className="App">
      <Link to='/'></Link>
      <Routes>
        <Route path='/' element = {<WebsiteBody/>}/>
        <Route path='/more/:index' element = {<MoreInfo/>}/>
         {/* * - wildcard */}
         <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
