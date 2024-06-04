import Image from "next/image";
import styles from "./page.module.css";







import FirstComponent from "../components/FirstComponent/FirstComponent";


export default function Home() {
  return (

    <main className={styles.main}>
      <h1 className={styles.title}>This page is made in React / Next.js</h1>
      <div className={styles.description}>
        
        <p>
          This is a new project to learn/develop with React/Next.js<br />
          At the moment this is built off the standard Next.js template. The current objective
          is to read documentation, some tutorials, and attach stuff together to  make a new basic website here.
          <br />
          <code className={styles.code}>
            <br />
            const makeStuff = true;<br />
            let build = Boolean(makeStuff);<br />
            const drink = &apos;coffee&apos;;<br />
            console.log(drink, &quot;=&quot;, build);<br />
          </code>
        </p>
       
      </div>

      <div className={`${styles.center} ${styles.zIndex}`}>
        <FirstComponent />
      </div>

      <div className={styles.grid}>
        <a
          href="https://conradswebsite.com/"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Conrad&apos;s Website<span>-&gt;</span>
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
            Conrad&apos;s Projects<span>-&gt;</span>
          </h2>
          <p>My main website</p>
        </a>



      </div>
    </main>
  );
}
