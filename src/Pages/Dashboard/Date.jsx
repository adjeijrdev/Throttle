import './Date.css'; 
function
 Date (props) {
    const month = props.date.toLocaleString('en-US',{month:'long'}); 
    const day = props.date.toLocaleString('en-US',{day:'2-digit'}); 
    const year = props.date.getFullYear(); 
    
    return(
        <div className="filter-date">
            <div className="filter-date__month">{month}</div>
            <div className="filter-date__year">{year}</div>
            <div className="filter-date__day">{day}</div>
            </div>
    );
}
export default Date;