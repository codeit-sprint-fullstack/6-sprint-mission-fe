import styles from "./Index.module.css";
import MarketList from "./model/MarketList";

const Market = () => {
  return (
    <section>
      <div className={styles.used_market__container}>
        <MarketList />
      </div>
    </section>
  );
};
export default Market;
