import React, { useEffect, useState } from 'react';

interface IncreaseCounterButtonProps {
    setCounterValue: (value: number) => void;
    setExecutionTime: (time: string | null) => void;
}

export const IncreaseCounterButton: React.FC<IncreaseCounterButtonProps> = ({ setCounterValue, setExecutionTime }) => {
    // Function to fetch the current counter value and update execution time
    const fetchCounterValue = async () => {
        const response = await fetch('/api/counter', { method: 'GET' });
        const data = await response.json();
        setCounterValue(data.counter);
        setExecutionTime(data.executionTime);
    };

    useEffect(() => {
        fetchCounterValue();
    }, []);

    const handleButtonClick = async () => {
        await fetch('/api/counter', { method: 'POST' });
        fetchCounterValue();
    };

    return (
        <div>
            <button className='clean-button' onClick={handleButtonClick}>Increase Counter</button>
        </div>
    );
};

const CounterComponent = () => {
    const [counterValue, setCounterValue] = useState<number | null>(null);
    const [executionTime, setExecutionTime] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCounterData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/counter');
                const data = await response.json();
                setCounterValue(data.counter);
                setExecutionTime(data.executionTime);
            } catch (error) {
                console.error('Failed to fetch counter data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCounterData();
    }, []);

    return (
        <div>
            <IncreaseCounterButton setCounterValue={setCounterValue} setExecutionTime={setExecutionTime} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <span>Counter value: {counterValue?.toString() ?? 'N/A'}</span><br />
                    <span>Response time: {executionTime ?? 'N/A'}</span>
                </div>
            )}
        </div>
    );


};

export { CounterComponent };