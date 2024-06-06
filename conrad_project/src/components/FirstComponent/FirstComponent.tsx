
import styles from './FirstComponent.module.css';

export const PanelComponent = (props: React.PropsWithChildren) => {
    const assert = require('assert');
    assert(1 + 1 === 2, "Math is broken!");
    //assert(2 + 1 === 2, "Math is broken!");

    return <div className={styles.panel}>{props.children}</div>;
};



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

