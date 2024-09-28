import {About, Footer, Header, Work} from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Header />
      <About />
      <Work />
      <Footer />
    </div>
  )
}

export default App
