import React from 'react';

interface IFieldTextProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readonly?: boolean;
}

const FieldText: React.FC<IFieldTextProps> = (
  {
    value,
    onChange,
    placeholder,
    className = '',
    disabled = false,
    readonly = false
  }) => {
  return (
    <input
      type="text"
      value={ value }
      onChange={ (e) => onChange(e.target.value) }
      placeholder={ placeholder }
      className={ `w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        disabled || readonly ? 'bg-gray-100 text-gray-500' : ''
      }
      ${ className }` }
      disabled={ disabled }
      readOnly={ readonly }
    />
  );
};

export default FieldText;