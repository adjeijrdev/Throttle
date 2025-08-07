// import React from 'react'

// export default function () {
//   return (
//      <div className={styles.tableContainerOuter}>
//         <div className={styles.tableContainer}>
//           {/* Filter Row */}
//           <div className={styles.filters}>
//             {filterOptions.map((option) => (
//               <button
//                 key={option}
//                 onClick={() => setFilter(option)}
//                 className={`${styles.filterButton} ${
//                   filter === option ? styles.activeFilter : ""
//                 }`}
//               >
//                 {option}
//               </button>
//             ))}
//           </div>

//           {/* Table */}
//           {filteredOrders.length > 0 ? (
//             <table className={styles.table}>
//               <thead className={styles.tableheader}>
//                 <tr
//                   onClick={() => setIsHeaderSelected(!isHeaderSelected)}
//                   className={`${styles.headerRow} ${
//                     isHeaderSelected ? styles.selectedHeader : ""
//                   }`}
//                 >
//                   {visibleCols.box && (
//                     <th className={styles.th}>
//                       <input
//                         type="checkbox"
//                         checked={isHeaderSelected}
//                         onChange={(e) => {
//                           setIsHeaderSelected(e.target.checked);
//                          e.stopPropagation();
//                         }}
//                         onClick={(e) => e.stopPropagation()}
//                       />
//                     </th>
//                   )}
//                   {visibleCols["map"] && (
//                     <th className={styles.thSmall}>Map</th>
//                   )}
//                   {visibleCols.dateTime && (
//                     <th className={styles.th}>Pickup Date, Time</th>
//                   )}
//                   {visibleCols.orderId && (
//                     <th className={styles.th}>Order ID</th>
//                   )}
//                   {visibleCols.destination && (
//                     <th className={styles.th}>Destination</th>
//                   )}
//                   {visibleCols.recipient && (
//                     <th className={styles.th}>Recipient</th>
//                   )}
//                   {visibleCols.phone && (
//                     <th className={styles.th}>Recipient's Tel</th>
//                   )}
//                   {visibleCols.payAmount && (
//                     <th className={styles.th}>Payment Amt</th>
//                   )}
//                   {visibleCols.status && <th className={styles.th}>Status</th>}
//                   {visibleCols.vendor && <th className={styles.th}>Vendor</th>}
//                   {visibleCols.tpl && <th className={styles.th}>3PLs</th>}
//                   {visibleCols.deliveryAmount && (
//                     <th className={styles.th}>Delivery Fee</th>
//                   )}
//                   {visibleCols.orderdate && (
//                     <th className={styles.th}>Delivery Date</th>
//                   )}
//                   {visibleCols.orderimg && (
//                     <th className={styles.th}>Order Image</th>
//                   )}
//                 </tr>
//               </thead>

//               <tbody>
//                 {filteredOrders.map((order, index) => (
//                   <tr
//                     key={order.orderId} // Use orderId as key instead of index
//                     onClick={(e) => {
//                       // Don't trigger row selection if clicking on a link or button
//                       if (
//                         e.target.tagName !== "A" &&
//                         e.target.tagName !== "BUTTON"
//                       ) {
//                         toggleRowSelection(order.orderId);
//                       }
//                     }}
//                     className={`${styles.tableRow} ${
//                       selectedRows.includes(order.orderId)
//                         ? styles.selectedRow
//                         : ""
//                     }`}
//                   >
//                     {visibleCols.box && (
//                       <td
//                         className={styles.td}
//                         onClick={(e) => e.stopPropagation()}
//                       >
//                         <input
//                           type="checkbox"
//                           checked={selectedRows.includes(order.orderId)}
//                           onChange={(e) => {
//                             toggleRowSelection(order.orderId, e);
//                           }}
//                         />
//                       </td>
//                     )}
//                     {visibleCols.map && (
//                       <td className={styles.td}>
//                         {" "}
//                         <img
//                           src={locationIcon}
//                           alt="Location Icon"
//                           style={{ width: "16px", height: "16px" }}
//                         />
//                       </td>
//                     )}
//                     {visibleCols.dateTime && (
//                       <td className={styles.td}>{order.dateTime}</td>
//                     )}
//                     {visibleCols.orderId && (
//                       <td className={styles.td}>{order.orderId}</td>
//                     )}
//                     {visibleCols.destination && (
//                       <td className={styles.td}>{order.destination}</td>
//                     )}
//                     {visibleCols.recipient && (
//                       <td className={styles.td}>{order.recipient}</td>
//                     )}
//                     {visibleCols.phone && (
//                       <td className={styles.td}>{order.phone}</td>
//                     )}
//                     {visibleCols.payAmount && (
//                       <td className={styles.td}>{order.payAmount}</td>
//                     )}
//                     {visibleCols.status && (
//                       <td className={styles.td}>
//                         <span
//                           className={`${styles.status} ${
//                             statusClass[order.status]
//                           }`}
//                         >
//                           {order.status}
//                         </span>
//                       </td>
//                     )}
//                     {visibleCols.vendor && (
//                       <td className={styles.td}>{order.vendor}</td>
//                     )}
//                     {visibleCols.tpl && (
//                       <td className={styles.td}>{order.tpl}</td>
//                     )}
//                     {visibleCols.deliveryAmount && (
//                       <td className={styles.td}>{order.deliveryAmount}</td>
//                     )}
//                     {visibleCols.orderdate && (
//                       <td className={styles.td}>{order.orderdate}</td>
//                     )}
//                     {visibleCols.orderimg && (
//                       <td className={styles.td}>{order.orderimg}</td>
//                     )}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <div className={styles.noResults}>
//               {selectedDate
//                 ? `No orders found for ${selectedDate.toLocaleDateString()}`
//                 : "No orders match your filters"}
//             </div>
//           )}
//         </div>
//       </div>
//   )
// }
