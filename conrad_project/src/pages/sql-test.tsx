

import React, { useEffect } from 'react';



const IndexPage = () => {
    useEffect(() => {
        (async () => {
            try {
              
                const response = await fetch('/api/test', {
                    method: 'GET', 
                    headers: {
                        'Content-Type': 'application/json',
              
                    },
          
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
    }, []); 

    return (
        <div>Testing SQL-Torso</div>
    );
};

export default IndexPage;

