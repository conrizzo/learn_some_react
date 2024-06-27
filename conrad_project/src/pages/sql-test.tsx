
import React, { useEffect } from 'react';
//import test from './api/test';
// import  test  from './api/test';

const IndexPage = () => {
    useEffect(() => {
        (async () => {
            try {
                // Replace `/api/test` with the correct path to your API route
                const response = await fetch('/api/test', {
                    method: 'GET', // or 'POST', depending on your API method
                    headers: {
                        'Content-Type': 'application/json',
                        // Include other headers as needed
                    },
                    // Include body if method is POST
                    // body: JSON.stringify({ key: 'value' }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                console.log(result);
            } catch (error) {
                console.error("Error running user test:", error);
            }
        })();
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div>Testing SQL-Torso</div>
    );
};

export default IndexPage;