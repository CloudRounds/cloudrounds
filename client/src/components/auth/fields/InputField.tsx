interface Field {
  label: string;
  name: string;
  type: string;
  required: boolean;
}

interface InputFieldProps {
  field: Field;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const InputField = ({ field, value, onChange, error }: InputFieldProps) => (
  <div className='mb-4'>
    <label className='block text-sm font-medium text-gray-600'>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      className='mt-1 p-2 w-full rounded-md border'
      required={field.required}
      value={value}
      onChange={onChange}
    />
    {error && <p className='text-red-500 text-xs mt-1'>{error}</p>}
  </div>
);

export default InputField;
