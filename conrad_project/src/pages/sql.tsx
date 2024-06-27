import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { turso } from "../utils/turso";

export const getServerSideProps = (async () => {
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