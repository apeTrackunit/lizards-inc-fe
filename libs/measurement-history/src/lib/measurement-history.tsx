import styles from './measurement-history.module.css';

/* eslint-disable-next-line */
export interface MeasurementHistoryProps {}

export function MeasurementHistory(props: MeasurementHistoryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to MeasurementHistory!</h1>
    </div>
  );
}

export default MeasurementHistory;
