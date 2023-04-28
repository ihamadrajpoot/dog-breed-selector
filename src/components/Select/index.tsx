import React, { ChangeEvent } from "react";

interface SelectProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
    return (
        <select value={value} onChange={onChange}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
