import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

export default function TipCalculator() {
  const { register, control, handleSubmit } = useForm();
  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <h1>React Hook Form DevTools</h1>

        <label>Test</label>
        <input {...register('test')} />
      </form>
      <DevTool control={control} /> {/* set up the dev tool */}
    </>
  );
}
