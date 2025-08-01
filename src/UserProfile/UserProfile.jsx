import style from "./UserProfile.module.css"
export default function UserProfile() {
  return (
    <div className={style["body"]}>
      <div className={style["top-row"]} >
        <div className={style["text"]}>
          <h1>Profile</h1>
        </div>
        <div className={style["buttons"]}>
          <button className={style["white"]} >Change Password</button>
          <button className={style["green"]}>Logout</button>
        </div>
      </div>
      <div className={style["bottom-row"]} > 
        <div className={style["display-picture-area"]}>  </div>
        <div className={ style["inputs-area"]}> inputs </div>
      </div>
    </div>
  )
}
