
import React, { useEffect } from 'react';
import runUserTest from '../components/SQL/test';

const IndexPage = () => {
    useEffect(() => {
        // Assuming runUserTest is defined/imported
        (async () => {
            try {
                const result = await runUserTest();
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