import React,{useState, useEffect} from 'react'

interface TextInputProps {
    name: string
    label: string
    errorMessage: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    maxLength?: number
    validator?: (value: string) => string
}

export const TextInput: React.FC<TextInputProps> = ({name,label,errorMessage,onChange,maxLength,validator}) => {

    const [inputValue, setInputValue] = useState<string>('');
    const updateInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e);
        setInputValue(e.target.value);
    }
    
    return (
        <div className='text-input'>
            <div>
                <span>{label}</span>
                <input
                    name={name}
                    onChange={updateInputValue}
                />
            </div>
        </div>
    )
}