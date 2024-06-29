import React, { useEffect, useState } from 'react';

interface IncreaseCounterButtonProps {
    setCounterValue: (value: number) => void;
}

export const IncreaseCounterButton: React.FC<IncreaseCounterButtonProps> = ({ setCounterValue }) => {
    const [executionTime, setExecutionTime] = useState<string | null>(null);
    // Function to fetch the current counter value
    // Update this so the NUMBER shows up on the page before any button click happens
    const fetchCounterValue = async () => {
        const response = await fetch('/api/counter', { method: 'GET' });
        const data = await response.json();
        setCounterValue(data.counter);
        setExecutionTime(data.executionTime); 
    };

    // useEffect hook to fetch the counter value when the component mounts
    useEffect(() => {
        fetchCounterValue();
    }, []); // Empty dependency array means this effect runs once on mount

    const handleButtonClick = async () => {
        await fetch('/api/counter', { method: 'POST' });
        // Fetch the updated counter value after the POST request
        fetchCounterValue();
    };

    return (
        <div>
            <button className='clean-button' onClick={handleButtonClick}>Increase Counter</button>
            <div>Response time: {executionTime ?? 'N/A'}</div>
        </div>
    );
};