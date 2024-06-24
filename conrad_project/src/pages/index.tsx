import Image from "next/image";
import styles from "./index.module.css";
import Link from 'next/link';

import FirstComponent, { PanelComponent } from "../components/FirstComponent/FirstComponent";


export default function Home() {
  return (

    <main className={styles.main}>
      <h1 className={styles.title}>This page is made in React / Next.js</h1>
      <div className={styles.description}>

        <p>
          Using this as a place to learn/develop with React/Next.js.
          At the moment this is built off the standard Next.js template but it is turning into its own unique project. The current objective
          is to read documentation, pick up information from some tutorials, and build my own application here in React.
          <br />
          <br />
          <code className={styles.code}>

            const makeStuff = true;<br />
            let build = Boolean(makeStuff);<br />
            const drink = &apos;coffee&apos;;<br />
            console.log(drink, &quot;=&quot;, build);<br />
          </code>
          <a className={styles.githubLink} href="https://github.com/conrizzo/learn_some_react/tree/main/conrad_project" target="_blank" rel="noopener noreferrer">
            Github</a>
        </p>





      </div>
      <div className={styles.grid}>

        <a
          href="https://conradswebsite.com/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Conrad&apos;s Website<span></span>
          </h2>
          <p>My main website</p>
        </a>

        <a
          href="https://conradswebsite.com/my-projects/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Conrad&apos;s Projects<span></span>
          </h2>
          <p>Projects I made</p>
        </a>

        <Link href="/photos"
          className={styles.card}
        >
          <h2>
            <span>
              Go to Photos Page
            </span>
          </h2>
          <p>Pictures of Germany</p>
        </Link>

        <Link href="/agree-to-terms"
          className={styles.card}
        >
          <h2>
            <span>
              Do you agree to these terms?
            </span>
          </h2>
          <p>Agree to terms</p>
        </Link>



      </div>
      <div className={`${styles.center} ${styles["index-image-adjustments"]}`}>
        <FirstComponent />
      </div>
      <div className={`${styles.center} ${styles["index-image-adjustments"]}`}>
        <PanelComponent>
          <h2>...</h2>
        </PanelComponent>
      </div>



    </main>
  );
}
