import styles from "./QuantitiInputSection.module.css";
import MinusIcon from "../../assets/minus-svgrepo-com.svg";
import PlusIcon from "../../assets/plus-large-svgrepo-com.svg";

export default function QuantitiInputSection({subtractItem,onInputChange,currentQty,addItem}) {
  return (
    <div className={styles.selectQty}>
      <img
        src={MinusIcon}
        className={currentQty <= 1 ? styles.disabled : ""}
        onClick={subtractItem}
        alt="Delete item"
      />
      <input
        type="text"
        inputMode="numeric"
        min={0}
        onChange={onInputChange}
        value={currentQty}
      />
      <img src={PlusIcon} onClick={addItem} alt="Add item" />
    </div>
  );
}
