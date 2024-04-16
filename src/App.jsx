import TipCalculator from './components/TipCalculator';
import logo from './assets/logo.svg';

function App() {
  return (
    <div className='w-full h-full md:h-screen bg-teal-100 flex flex-col items-center'>
      <img src={logo} alt='' className='h-10 w-14 my-10' />
      <TipCalculator />
    </div>
  );
}

export default App;
