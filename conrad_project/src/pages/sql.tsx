import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { turso } from "../utils/turso";



export const getServerSideProps = (async () => {

    // bad practice to create table here - but just to test things and learn
    await turso.execute(`
        CREATE TABLE IF NOT EXISTS table_name (
            id SERIAL PRIMARY KEY,
            data TEXT NOT NULL
        )
    `);

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
        <div>
            <p>Test on other page: </p>
            <ul>
                {rows.map((row: any) => (
                    <li key={row.id}>{row.id}</li>
                ))}
            </ul>
        </div>
    );
}