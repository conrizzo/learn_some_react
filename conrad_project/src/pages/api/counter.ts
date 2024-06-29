import type { NextApiRequest, NextApiResponse } from 'next';
import { turso } from '../../utils/turso'; // Adjust the import path as necessary

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        try {
            // Perform the SQL operation to increase the counter
            await turso.execute(`
                UPDATE counter SET counter = counter + 1 WHERE id = 1
            `);
            res.status(200).json({ success: true, message: 'Counter increased' });
        } catch (error) {
            console.error('Error increasing counter:', error);
            res.status(500).json({ success: false, message: 'Failed to increase counter' });
        }
    } else if (req.method === 'GET') {
        const startTime = Date.now();
        try {

            const result = await turso.execute(`
                SELECT counter FROM counter WHERE id = 1
            `);
            const endTime = Date.now(); // End timing after the operation
            const executionTime = endTime - startTime; // Calculate execution time
            //  result.rows contains the query results and is not empty
            if (result.rows.length > 0) {
                const currentCounter = result.rows[0].counter;
                res.status(200).json({ success: true, counter: currentCounter, executionTime: `${executionTime}ms` });
            } else {
                res.status(404).json({ success: false, message: 'Counter not found', executionTime: `${executionTime}ms` });
            }
        } catch (error) {
            console.error('Error retrieving counter:', error);
            res.status(500).json({ success: false, message: 'Failed to retrieve counter' });
        }
    } else {
        // If the request method is not POST or GET, return a 405 Method Not Allowed error
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}