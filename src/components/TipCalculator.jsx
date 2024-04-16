import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import iconDollar from '../assets/icon-dollar.svg';
import iconPerson from '../assets/icon-person.svg';
import { useState } from 'react';

export default function TipCalculator() {
  const [hide, sethide] = useState(false);
  const [activeTip, setActiveTip] = useState(null);
  const [isCustomTipActive, setIsCustomTipActive] = useState(false);
  const { register, control, handleSubmit, setValue, watch, formState, reset } =
    useForm({
      defaultValues: {
        bill: null,
        tip: null,
        people: 2,
      },
    });

  const { errors } = formState;

  const { bill, tip, people } = watch();

  const buttonStyle =
    'bg-teal-900 py-2 font-semibold rounded text-white hover:bg-teal-400 hover:text-teal-950';

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

  const tipAmount = (bill * (tip / 100)) / people;

  const billAmount = bill / people + tipAmount;

  return (
    <div className='w-full h-full bg-slate-50 rounded-2xl shadow-xl'>
      <form
        onSubmit={handleSubmit((d) => console.log(d))}
        className='flex flex-col p-6 gap-4'
      >
        {/* Bill amount */}
        <div>
          <label htmlFor='bill' className='text-xs font-semibold text-gray-500'>
            Bill
          </label>
          <div className='relative mt-1'>
            <input
              type='number'
              id='bill'
              {...register('bill', {
                required: 'bill is required',
                valueAsNumber: true,
              })}
              className='bg-slate-200 p-2 pr-2 text-right font-semibold text-emerald-900 rounded-md w-full'
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
          <label
            htmlFor='people'
            className='text-xs font-semibold text-gray-500'
          >
            Number of People
          </label>
          <div className='relative mt-1'>
            <input
              type='number'
              id='people'
              {...register('people', {
                required: 'people is required',
                valueAsNumber: true,
              })}
              className='bg-slate-200 p-2 pr-2 text-right font-semibold text-emerald-900 rounded-md w-full'
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

        <div className='bg-teal-900 rounded-lg px-3 py-6 '>
          <div className='flex items-center justify-between mb-3'>
            <p className='text-[14px] text-white font-bold'>
              Tip Amount
              <span className='block text-[12px] mt-[1px] text-teal-200 opacity-70'>
                / person
              </span>
            </p>
            <p className='text-xl font-bold text-teal-400'>
              ${tipAmount.toFixed(2)}
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='text-[14px] text-white font-bold'>
              Total
              <span className='block text-[12px] mt-[1px] text-teal-200 opacity-70'>
                / person
              </span>
            </p>
            <p className='text-xl font-bold text-teal-400'>
              ${billAmount.toFixed(2)}
            </p>
          </div>
          <button
            type='button'
            onClick={() => reset()}
            className='mt-5 w-full py-2 bg-teal-400 text-sm font-bold text-teal-900 rounded-md'
          >
            RESET
          </button>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
}
