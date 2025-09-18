import { BeatLoader } from 'react-spinners';
import styles from './primaryButton.module.css';

export default function PrimaryButton({onClick, disabled, text, willOpenModal=false}) {
  return (
    <button type="button" onClick={()=>onClick()} disabled={disabled} className={styles.container}>
         {
         
         (disabled && !willOpenModal) ? ( disabled ? <BeatLoader color="white" /> : text) : text}
        </button>
  )
}
