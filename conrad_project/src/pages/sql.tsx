import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { useState, useEffect } from "react";
import { turso } from "../utils/turso";
import styles from "./sql.module.css"
import { IncreaseCounterButton } from "./api/increase"

const CounterComponent = () => {
    const [counterValue, setCounterValue] = useState<number | null>(null);
    const [executionTime, setExecutionTime] = useState<string | null>(null);
    useEffect(() => {
        // Fetch the initial counter value when the component mounts
        const fetchCounterValue = async () => {
            const response = await fetch('/api/increase'); // Adjust API endpoint as necessary
            const data = await response.json();
            setCounterValue(data.counter);
            setExecutionTime(data.executionTime); 
        };

        fetchCounterValue();
    }, []);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <IncreaseCounterButton setCounterValue={setCounterValue} />
            <p style={{ marginLeft: '10px' }}>Counter value: {counterValue?.toString() ?? 'N/A'}</p>
        
        </div>
    );
};

export { CounterComponent };




export const getServerSideProps = (async () => {

    const result = await turso.execute(`
        SELECT counter FROM counter WHERE id = 1
    `);

    const counterValue = result.rows[0].counter;

    // bad practice to create table here - but just to test things and learn

    await turso.execute(`
        CREATE TABLE IF NOT EXISTS counter (
            id SERIAL PRIMARY KEY,
            counter TEXT NOT NULL
        )
    `);

    /*
    await turso.execute(`
        UPDATE counter SET counter = counter + 1 WHERE id = 1
    `);
        */




    const { rows } = await turso.execute("SELECT * FROM table_name");
    const { rows: ROWS_TABLE_2 } = await turso.execute("SELECT * FROM users");
    const { rows: rows_3 } = await turso.execute("SELECT * FROM counter");

    return {
        props: {
            rows,
            ROWS_TABLE_2,
            rows_3,
            counterValue,

        },
    };
}) satisfies GetServerSideProps<{ rows: any[], ROWS_TABLE_2: any[] }>;

export default function Page({
    rows,
    ROWS_TABLE_2,
    rows_3,
    counterValue,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const [c1, setCounterValue] = useState<number | null>(null);

    useEffect(() => {
        // Fetch the initial counter value when the component mounts
        const fetchCounterValue = async () => {
            const response = await fetch('/api/getCounterValue'); // Adjust API endpoint as necessary
            const data = await response.json();
            setCounterValue(data.counter);
        };

        fetchCounterValue();
    }, []);


    return (
        <div className={`${styles.centering} ${styles.paragraphs}`}>

            <div className={styles['set-width']}>
                <h1>This page is to learn how to use SQL tools with React / Next.js</h1>
                <p>June, 28 2024 - This page connects to a <a className='link' href="https://turso.tech/">Turso</a> database. I have my own PostgreSQL database hosted in Docker on my VPS, but the point of this is
                    to learn how to use more React since I'm already comfortable using Vue.js.
                    Am in particular, curious about using SQL with React and decided to test this backend database service and learn
                    how to/best practices to connect to backend data with React / Next.js. {"I've already learned the basics of how to use backend commands on Vue.js with my self made Flask backend querying PostgreSQL."} A <a className='link' href="https://github.com/conrizzo/conradswebsite/blob/master/src/views/projects/UserAccount/user.ts">user interface</a> with <a className='link' href="https://github.com/conrizzo/conradswebsite/blob/master/src/axios.js">axios to makes posts and get secure http cookies and refresh cookies</a>, and a fairly
                    modular organized self-written <a className='link' href="https://github.com/conrizzo/python_back_end">Flask backend</a>.
                </p>
                <h2>SQLite - Table 1</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row: any) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.data}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2>SQLite - Table 2</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Food</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ROWS_TABLE_2.map((row: any) => (
                            <tr key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.food}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br />
                {/* <p>Value on page load: {counterValue?.toString() ?? 'N/A'}</p> */}
                
                <h2>Counter</h2>
                <p>Queries SQLite database in realtime and simply increases the number.</p>
                <p>Keep in mind the time in ms will increase the further you are from Amsterdam!</p>
                <CounterComponent />

            </div>
        </div>

    );
}