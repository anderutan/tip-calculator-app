import TipCalculator from './components/TipCalculator';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className='w-full h-screen bg-teal-100 flex flex-col items-center'>
      <img src={logo} alt='' className='h-8 w-12 my-6' />
      <TipCalculator />
    </div>
  );
}

export default App;
