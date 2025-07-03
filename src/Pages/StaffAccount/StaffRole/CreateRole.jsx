import "./StaffRole.css";
import { useNavigate } from "react-router";
const permssions = [
  {
    _id: 1,
    name: "Dispatch",
    description: "Dispatch",
  },
  {
    _id: 2,
    name: "Assign delivery",
    description: "Assign delivery",
  },
  {
    _id: 3,
    name: "Change delivery date (reschedule)",
    description: "Change delivery date (reschedule)",
  },
  {
    _id: 4,
    name: "name4",
    description:
      "Assigning and dispatching orders via delivery date and assigning to 3PLs or rider",
  },
  {
    _id: 5,
    name: "name5",
    description: "Complete orders or mark as delivered",
  },
  {
    _id: 6,
    name: "name6",
    description: "Book or create new orders",
  },
  {
    _id: 7,
    name: "name7",
    description:
      "Change order statuses (excluding 'delivered' or 'completed' for some roles)",
  },
  {
    _id: 8,
    name: "name8",
    description:
      "Sum up total amount of completed orders (filtered by date, vendor, or rider/3PL)",
  },
  {
    _id: 9,
    name: "name9",
    description: "Mark orders as “Paid to Vendor” (Finance only)",
  },
  {
    _id: 10,
    name: "name10",
    description: "Export filtered completed orders by vendor to Excel",
  },
];
function CreateRole() {
  const navigate = useNavigate()
  return (
    <div className="staffs account">
      <h2 className="se">Create New Role</h2>

      <form className="role-form">
        <div className="form-section">
          <h3>Role Title</h3>
          <div>
            <label for="roleTitle">
              Enter role title <span className="required-field">*</span>
            </label>
            <br />
            <input
              type="text"
              id="roleTitle"
              name="roleTitle"
              className="text-input"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Permissions Selection</h3>
          <ul>
            {permssions.map((permission) => {
              return (
                <li key={permission._id}>
                  <div>
                    <input
                      type="checkbox"
                      id={permission._id}
                      name={permission.name}
                    />
                  </div>

                  <label for={permission._id} className="list-label">
                    {permission?.description}
                  </label>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="account-create-btn">
          <button type="button" className="btn-cancel" onClick={()=>navigate(-1)}>Cancel</button>
          <button className="btn-create">Create</button>
        </div>
      </form>
    </div>
  );
}

export default CreateRole;
