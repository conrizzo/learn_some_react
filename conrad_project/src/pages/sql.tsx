import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { turso } from "../utils/turso";



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

    const { rows } = await turso.execute("SELECT * FROM data");

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
        <div>
            <h1>This page is to learn how to use SQL with React</h1>
            <ul>
                {rows.map((row: any) => (
                    <li key={row.id}>{row.id} - {row.name}</li>
                ))}
            </ul>
        </div>
    );
}