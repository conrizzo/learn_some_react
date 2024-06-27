

//const API_KEY = process.env.TURSO_SQL; // Set a default value for apiKey if it is undefined
//const TURSO_URL = process.env.TURSO_DATABASE_URL;
import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from "@libsql/client";

let count = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const turso = createClient({
        url: process.env.TURSO_DATABASE_URL || '',
        authToken: process.env.TURSO_AUTH_TOKEN,
    });

    console.log(turso);
    console.log(process.env.TURSO_DATABASE_URL);
    console.log(process.env.TURSO_AUTH_TOKEN);

    try {
        // Your database operation logic here
        const result = await runUserTest(turso); // Assuming runUserTest is refactored to be usable here
        res.status(200).json(result);
    } catch (error) {
        console.log(turso);
        count++;
        console.log(count);
        console.error("Failed to execute database query:", error);
        res.status(500).json({ error: "Failed to execute database query" });
    }
}


// Modify 'runUserTest' to accept 'turso' as a parameter
async function runUserTest(turso: any) {
    try {

        await turso.execute({
            sql: `CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE
                  )`,
        });

        await turso.execute({
            sql: "INSERT INTO users (name, email) VALUES (?, ?)",
            args: ["New User", "newuser@example.com"],
        });

        await turso.execute("SELECT * FROM users");

        let answer = await turso.execute({
            sql: "SELECT * FROM users WHERE id = ?",
            args: [1],
        });

        return answer;
    } catch (error) {
        count++;
        console.log(count);
        console.error("Failed to execute database query:", error);
        throw error;
    }
}


// Use an async IIFE to call runUserTest and log the result


