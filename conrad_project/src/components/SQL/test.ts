

const API_KEY = process.env.TURSO_SQL || ""; // Set a default value for apiKey if it is undefined
const TURSO_URL = process.env.TURSO_DATABASE_URL || "";

import { createClient } from "@libsql/client";

const turso = createClient({
    url: TURSO_URL,
    authToken: API_KEY,
});

async function runUserTest() {
    try {
        // Execute a simple SELECT query to fetch all users
        await turso.execute("SELECT * FROM users");

        // Execute a parameterized query to fetch a user by ID
        let answer = await turso.execute({
            sql: "SELECT * FROM users WHERE id = ?",
            args: [1],
        });

        return answer; // Return the query result
    } catch (error) {
        console.error("Failed to execute database query:", error);
        throw error; // Rethrow the error after logging
    }
} 

// Use an async IIFE to call runUserTest and log the result
(async () => {
    try {
        const result = await runUserTest();
        console.log(result);
    } catch (error) {
        console.error("Error running user test:", error);
    }
})();

console.log(runUserTest());

export default runUserTest; // Export the function for use in other files