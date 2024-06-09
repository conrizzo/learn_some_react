// pages/photos.tsx
import fs from 'fs';
import path from 'path';
import React from 'react';
import styles from './photos.module.css';

export async function getStaticProps() {

    const imagesDirectory = path.join(process.cwd(), 'public/images/Germany');
    const filenames = fs.readdirSync(imagesDirectory);
    const imagePaths = filenames.map(filename => `/images/Germany/${filename}`);

    return {

        props: {
            imagePaths,
        },
    };
}

interface PhotosProps {
    imagePaths: Array<string>;
}
const Photos: React.FC<PhotosProps> = ({ imagePaths }) => {
    return (
        <div>
            <h1>Germany Photos by Conrad © 2024</h1>
            <div className={styles.photosContainer}>
                {imagePaths.map((path, index) => (
                    <a key={index} href={path} target="_blank" rel="noopener noreferrer">
                        <figure className={`${styles.photoFigure} ${styles.localFigure}`}>
                            <img src={path} alt={`Photo ${index + 1}`} className={styles.photo} loading="lazy" />
                            {index < 5 && <span>June 7, 2024</span>}
                        </figure>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default Photos;