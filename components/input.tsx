interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  prepend?: React.ReactNode;
  append?: React.ReactNode;
}

const Input = ({ label, prepend, append, id, ...props }: InputProps) => {
  return (
    <div className='flex flex-col w-full'>
      {label && (
        <label
          htmlFor={id}
          className='mb-1 text-sm font-medium text-gray-700'
        >
          {label}
        </label>
      )}
      <div className='flex items-center border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500'>
        {prepend && <div className='flex items-center px-3 bg-gray-100 text-gray-600 border-r h-full'>{prepend}</div>}
        <input
          id={id}
          {...props}
          className='flex-1 px-3 py-2 text-sm text-gray-900 bg-white border-none focus:outline-none'
        />
        {append && <div className='flex items-center px-3 bg-gray-100 text-gray-600 border-l h-full'>{append}</div>}
      </div>
    </div>
  );
};

export default Input;
