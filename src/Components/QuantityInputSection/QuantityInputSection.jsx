import styles from "./QuantityInputSection.module.css";
import MinusIcon from "../../assets/minus-svgrepo-com.svg";
import PlusIcon from "../../assets/plus-large-svgrepo-com.svg";
import PropTypes from "prop-types";
export default function QuantityInputSection({subtractItem,onInputChange,currentQty,addItem}) {
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

QuantityInputSection.propTypes = {
  subtractItem: PropTypes.func,
  onInputChange: PropTypes.func,
  currentQty: PropTypes.number, 
  addItem: PropTypes.func,
}