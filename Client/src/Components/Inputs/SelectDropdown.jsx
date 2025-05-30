import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'
const SelectDropdown = ({ options, value, onChange, placeholder }) => {
  
    const [isOpen, setIsOpen] = useState(false);
    const handleSelect = (selectedValue) => {
        onChange(selectedValue);
        setIsOpen(false);
    }

    return (
    <div className='relative w-full'>
        <button onClick={() => setIsOpen(!isOpen)} className='w-full flex items-center justify-between bg-white border border-slate-300 text-sm rounded-md px-2.5 py-3 text-black'>
            {value ? options.find(opt => opt.value === value)?.label : placeholder}
            <span className='ml-2'>{isOpen ? <LuChevronDown className='rotate-180'/> : <LuChevronDown className=''/>}</span>
        </button>

        {isOpen && (
            <div className='absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10'>
                {options.map((opt) => (
                    <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className='px-3 py-2 text-sm cursor-pointer hover:bg-slate-100'>
                        {opt.label}
                    </div>
                ))}
            </div>
        )}
    </div>
  )
}

export default SelectDropdown