import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { turso } from "../utils/turso";
import styles from "./sql.module.css"



export const getServerSideProps = (async () => {

    // bad practice to create table here - but just to test things and learn
    /*
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            data TEXT NOT NULL
        )
    `);
    */

    const { rows } = await turso.execute("SELECT * FROM table_name");

    return {
        props: {
            rows,
        },
    };
}) satisfies GetServerSideProps<{ rows: any[] }>;

export default function Page({
    rows,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div className={styles.centering}>
            <div>
                <h1>This page is to learn how to use SQL with React</h1>
                <p>June, 28 2024 - This page connects to a <a className='link' href="https://turso.tech/">Turso</a> database.
                    Am curious about using SQL with react and decided to test this backend database service and learn
                    how to/best practices to connect to backend data with React.
                </p>

                <ul>
                    {rows.map((row: any) => (
                        <li key={row.id}>{row.id} - {row.data}</li>
                    ))}
                </ul>
            </div>
        </div>

    );
}