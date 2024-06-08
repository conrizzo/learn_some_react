// pages/photos.tsx
import fs from 'fs';
import path from 'path';
import React from 'react';
import styles from './Photos.module.css';

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
          <div className={styles.photosContainer}>
              {imagePaths.map((path, index) => (
                  <img key={index} src={path} alt={`Photo ${index + 1}`} className={styles.photo} />
              ))}
          </div>
      );
  };

export default Photos;