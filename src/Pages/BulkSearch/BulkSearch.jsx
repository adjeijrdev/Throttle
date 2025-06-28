import styles from "./BulkSearch.module.css";
import reseticon from "../../Assets/icons/reseticon.png";
import searchicon from "../../Assets/icons/searchicon.png";
import { ChevronLeft } from 'lucide-react';




export default function BulkSearch() {


  return  (
    <div className="dashboard-content">
       <div style={{maxWidth:'100%', display:'flex', justifyContent:'space-between', borderBottom:' 0.25rem solid #ddd', marginBottom:'1.5rem'}} >
    <div style={{display:'grid'}}>
      <div className={styles.overview}>Bulk Search</div>
     <div className={styles.overviewtext}>Visual summary of key sales performance metrics and your data</div>
     </div>
     </div>
     <div style={{display:'flex',gap:'2.5rem'}}>
      <div className={styles.Outercontainer}> 
      <div className="details_title">Enter Order ID for the orders and search</div>
      <input type="text" ></input>
     </div>
     <button className={styles.verticalButton}> <ChevronLeft size={18} /></button>
     </div>

     <div className={styles.btncontainer}>
            <button className={styles.resetbtn}>
              <img src={reseticon} alt="reset Icon" style={{ width: '16px', height: '16px' }} /> Reset
            </button>
            <button className={styles.searchbtn} >
              <img src={searchicon} alt="search Icon" style={{ width: '16px', height: '16px' }} /> Search
            </button>
          </div>
    </div>
  );
}
