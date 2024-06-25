// TermsCheckbox.tsx
import React from 'react';
import styles from './checkbox.module.css';


interface CheckboxProps {
    isChecked: boolean;
    onChange: () => void;
    labelText?: string; // Make labelText optional
}



const Checkbox = (
    { isChecked, onChange, labelText = 'I agree to the terms and conditions' }: CheckboxProps) => (
   
        <label>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
            />
            <span className={`${styles['label-text']}`}>{labelText}</span> {/* labelText will use the default if not provided */}
        </label>
  
);

export default Checkbox;