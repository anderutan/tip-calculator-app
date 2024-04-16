import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import iconDollar from '../assets/icon-dollar.svg';
import iconPerson from '../assets/icon-person.svg';
import { useState } from 'react';

export default function TipCalculator() {
  const [hide, sethide] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const [isCustomTipActive, setIsCustomTipActive] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [billAmount, setBillAmount] = useState(0);
  const { register, control, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      bill: null,
      tip: null,
      people: 2,
    },
  });

  const { bill, tip, people } = watch();

  const buttonStyle =
    'bg-teal-900 py-2 font-semibold rounded text-white hover:bg-teal-400 hover:text-teal-950';

  const secondBtnStyle =
    'mt-5 w-full py-2 bg-teal-400 text-sm font-bold text-teal-900 rounded-md hover:text-teal-400 hover:bg-teal-950 active:bg-white active:text-black';

  const handleSetValue = (value) => {
    setValue('tip', value);
    setActiveTip(value);
    setIsCustomTipActive(false);
  };

  const handleCustomTipChange = (e) => {
    const value = e.target.value;
    setValue('tip', Number(value));
    setActiveTip(null);
    setIsCustomTipActive(true);
  };

  const handleBillChange = (e) => {
    setValue('bill', Number(e.target.value));
  };

  const handlePeopleChange = (e) => {
    setValue('people', Number(e.target.value));
  };

  const onSubmit = (data) => {
    const { bill, tip, people } = data;
    if (bill > 0 && people > 0) {
      const tipTotal = (bill * tip) / 100 / people;
      setTipAmount(tipTotal);
      setBillAmount(bill / people + tipTotal);
    }
  };

  return (
    <div className='w-full bg-slate-50 rounded-2xl shadow-xl max-w-[500px] md:max-w-[1000px] md:max-h-[600px]'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col p-6 gap-4 md:grid md:grid-cols-2'
      >
        {/* Bill amount */}
        <div>
          <div className='flex justify-between items-end'>
            <label
              htmlFor='bill'
              className='text-xs font-semibold text-gray-500'
            >
              Bill
            </label>
            <p className='text-[0.5em] text-red-600'>
              {bill < 0 ? 'Must more than zero' : null}
              {isNaN(bill) ? 'Must be number' : null}
            </p>
          </div>
          <div className='relative mt-1'>
            <input
              id='bill'
              onChange={handleBillChange}
              {...register('bill', {
                required: 'bill is required',
                valueAsNumber: true,
              })}
              type='text'
              placeholder='Number only'
              className={`bg-slate-200 p-2 pr-3 text-right font-semibold text-emerald-900 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-teal-400 
              ${
                bill < 0 || isNaN(bill)
                  ? 'ring-1 ring-red-600 focus:ring-1 focus:ring-red-600'
                  : ''
              }`}
            />
            <div
              className='absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none'
            >
              <img src={iconDollar} alt='' />
            </div>
          </div>
        </div>

        {/* Tip amount */}
        <div>
          <label htmlFor='tip' className='text-xs font-semibold text-gray-500'>
            Select Tip %
          </label>
          {hide && (
            <input
              type='number'
              id='tip'
              {...register('tip', { required: 'Please pick a tip % below.' })}
            />
          )}
          <div className='grid grid-cols-2 py-2 gap-2'>
            <button
              className={`${buttonStyle} ${
                activeTip === 3 && 'bg-teal-400 text-teal-900'
              }`}
              onClick={() => handleSetValue(3)}
            >
              3%
            </button>
            <button
              className={`${buttonStyle} ${
                activeTip === 5 && 'bg-teal-400 text-teal-900'
              }`}
              onClick={() => handleSetValue(5)}
            >
              5%
            </button>
            <button
              className={`${buttonStyle} ${
                activeTip === 7 && 'bg-teal-400 text-teal-900'
              }`}
              onClick={() => handleSetValue(7)}
            >
              7%
            </button>
            <button
              className={`${buttonStyle} ${
                activeTip === 10 && 'bg-teal-400 text-teal-900'
              }`}
              onClick={() => handleSetValue(10)}
            >
              10%
            </button>
            <button
              className={`${buttonStyle} ${
                activeTip === 12 && 'bg-teal-400 text-teal-900'
              }`}
              onClick={() => handleSetValue(12)}
            >
              12%
            </button>
            <input
              type='number'
              placeholder='Custom'
              className={`text-right bg-slate-200 rounded pr-2 font-semibold text-emerald-900 ${
                isCustomTipActive ? 'bg-teal-400 text-teal-900' : ''
              }`}
              onChange={handleCustomTipChange}
            />
          </div>
        </div>

        {/* Number of People */}
        <div>
          <div className='flex justify-between items-end'>
            <label
              htmlFor='people'
              className='text-xs font-semibold text-gray-500'
            >
              Number of People
            </label>
            <p className='text-[0.5em] text-red-600'>
              {people === 0
                ? "Can't be zero"
                : people < 0
                ? "Can't less zero"
                : null}
            </p>
          </div>
          <div className='relative mt-1'>
            <input
              type='number'
              id='people'
              min={0}
              max={100}
              {...register('people', {
                required: 'people is required',
                valueAsNumber: true,
              })}
              onChange={handlePeopleChange}
              className={`bg-slate-200 p-2 pr-4 text-right font-semibold text-emerald-900 rounded-md w-full
              focus:outline-none focus:ring focus:ring-teal-400
              ${
                people <= 0
                  ? 'ring-1 ring-red-600 focus:ring-1 focus:ring-red-600'
                  : ''
              }`}
            />
            <div
              className='absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none'
            >
              <img src={iconPerson} alt='' />
            </div>
          </div>
        </div>

        <div className='bg-teal-900 rounded-lg px-3 py-6 md:col-start-2 md:row-start-1 md:row-end-4 md:flex md:flex-col md:px-6 md:pt-10 md:pb-6'>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-[14px] text-white font-bold md:text-sm'>
              Tip Amount
              <span className='block text-[12px] mt-[1px] text-teal-200 opacity-70 md:text-[14px]'>
                / person
              </span>
            </p>
            <p className='text-xl font-bold text-teal-400 md:text-3xl'>
              ${tipAmount ? tipAmount.toFixed(2) : '0.00'}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[14px] text-white font-bold md:text-sm'>
              Total
              <span className='block text-[12px] mt-[1px] text-teal-200 opacity-70 md:text-[14px]'>
                / person
              </span>
            </p>
            <p className='text-xl font-bold text-teal-400 md:text-3xl'>
              ${billAmount ? billAmount.toFixed(2) : '0.00'}
            </p>
          </div>
          <input type='submit' className={`${secondBtnStyle} md:mt-auto`} />
          <button
            type='button'
            onClick={() => reset()}
            className={`${secondBtnStyle} md:mt-2`}
          >
            RESET
          </button>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
}
