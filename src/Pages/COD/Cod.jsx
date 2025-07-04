import CustomDatePicker from '../../Components/datePicker/CustomDatePicker'
import './Cod.css'

export default function Cod() {
  return (
    <div>
      <div>
        <h3>Cash On Delivery</h3>
        <div>Search bulk orders by entering order ID</div>
      </div>

      <div>
        <div>
          <div>Enter/Search Order ID</div>
          <div className='cod-pop-id-canvas'></div>
        </div>
        <div>
          <div>Date range</div>
          <div>
            <CustomDatePicker/>
          </div>

        </div>
      </div>
    </div>
  )
}
