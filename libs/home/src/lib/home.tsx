import styles from './home.module.css';
import {TestComponent} from "@lizards-inc-fe/shared-components";

/* eslint-disable-next-line */
export interface HomeProps {}

export function Home(props: HomeProps) {
  return (
    <div className={styles['container']}>
        <h1>Welcome to Home!</h1>
        <TestComponent/>
    </div>
  );
}

export default Home;
