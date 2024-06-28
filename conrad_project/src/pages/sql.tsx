import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { turso } from "../utils/turso";
import styles from "./sql.module.css"



export const getServerSideProps = (async () => {

    // bad practice to create table here - but just to test things and learn
    
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            food TEXT NOT NULL
        )
    `);
    

    const { rows } = await turso.execute("SELECT * FROM table_name");

    const { rows: ROWS_TABLE_2 } = await turso.execute("SELECT * FROM users");
    
    return {
        props: {
            rows, 
            ROWS_TABLE_2
        },
    };
    }) satisfies GetServerSideProps<{ rows: any[], ROWS_TABLE_2: any[] }>;

export default function Page({
    rows,
    ROWS_TABLE_2,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={styles.centering}>
            <div className={styles['set-width']}>
                <h1>This page is to learn how to use SQL with React</h1>
                <p>June, 28 2024 - This page connects to a <a className='link' href="https://turso.tech/">Turso</a> database.
                    Am curious about using SQL with React and decided to test this backend database service and learn
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
            </div>
        </div>

    );
}