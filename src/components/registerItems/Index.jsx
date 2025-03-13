import styles from "./Index.module.css";
import AddItems from "./model/AddItems";

const RegisterItems = () => {
  return (
    <section>
      <div className={styles.used_market__container}>
        <AddItems />
      </div>
    </section>
  );
};
export default RegisterItems;
