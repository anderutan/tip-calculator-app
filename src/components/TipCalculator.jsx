import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import iconDollar from '../assets/icon-dollar.svg';

export default function TipCalculator() {
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      bill: 0,
      tip: 0,
      people: 1,
    },
  });

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
            <button className='bg-teal-900 py-2 font-semibold rounded text-white selected:bg-teal-400'>
              3%
            </button>
            <button>5%</button>
            <button>7%</button>
            <button>10%</button>
            <button>12%</button>
            <input type='number' placeholder='Custom' />
          </div>
        </div>
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </div>
  );
}
