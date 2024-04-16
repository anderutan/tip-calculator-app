import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import iconDollar from '../assets/icon-dollar.svg';
import { useState } from 'react';

export default function TipCalculator() {
  const { register, control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      bill: 0,
      tip: 0,
      people: 1,
    },
  });

  const watchTipsValue = watch('tip');

  console.log(watchTipsValue);

  const buttonStyle =
    'bg-teal-950 py-2 font-semibold rounded text-white hover:bg-teal-400 hover:text-teal-950';

  const handleSetValue = (value) => {
    setValue('tip', value);
  };
  return (
    <div className='w-full h-full bg-slate-50 rounded-2xl shadow-xl'>
      <form
        onSubmit={handleSubmit((d) => console.log(d))}
        className='flex flex-col p-6 gap-4'
      >
        <div>
          <label htmlFor='bill' className='text-xs font-semibold text-gray-500'>
            Bill
          </label>
          <div className='relative'>
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

        <div>
          <label htmlFor='tip'>Select Tip %</label>
          <input
            type='number'
            id='tip'
            {...register('tip', { required: 'Please pick a tip % below.' })}
          />
          <div className='grid grid-cols-2 py-2 gap-2'>
            <button className={buttonStyle} onClick={() => handleSetValue(3)}>
              3%
            </button>
            <button className={buttonStyle} onClick={() => handleSetValue(5)}>
              5%
            </button>
            <button className={buttonStyle} onClick={() => handleSetValue(7)}>
              7%
            </button>
            <button className={buttonStyle} onClick={() => handleSetValue(10)}>
              10%
            </button>
            <button className={buttonStyle} onClick={() => handleSetValue(12)}>
              12%
            </button>
            <input
              type='number'
              placeholder='Custom'
              className='text-right bg-slate-200 rounded pr-2 font-semibold text-emerald-900'
              onChange={(e) => handleSetValue(e.target.value)}
            />
          </div>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
}
