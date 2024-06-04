
import styles from './FirstComponent.module.css';


export default function Profile() {
    return (
        <div>
            <h1>Bird Chirp,</h1>
            <img
                  src="/images/diffBird.jpg"
                alt="Bird in the sky"
            />
            <figcaption className={styles.centerWithFlex}>Just a picture I created</figcaption>
        </div>
    )
}

