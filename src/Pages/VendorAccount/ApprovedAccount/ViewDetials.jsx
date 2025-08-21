import { useNavigate, useLocation } from "react-router";
import TextItem from "../../../Components/TextItem";
import { useQuery } from "@apollo/client";
import { GET_VENDOR, GET_ALL_VENDORS } from "../../../graphql/generalQueries";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { approveVendorAPI, deleteVendorAPI } from "../../../api/authentication";
import toast from "react-hot-toast";
import { removeSingleVendrFromCache } from "../../../graphql/graphqlConfiguration";
import DeleteModal from "../../../Components/DeleteModal";
import imgIcon from "../../../Assets/icons/img.png";

export default function VendorApprovedViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteVendorName, setDeleteVendorName] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    loading: vendorLoading,
    error: vendorError,
    data: vendorData,
    refetch: refetchVendor,
  } = useQuery(GET_VENDOR, {
    variables: {
      vendorId: id,
    },
  });

  const onApproveStaff = async (data) => {
    try {
      setIsSubmitting(true);
      const result = await approveVendorAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      removeSingleVendrFromCache(id);
      // fetchMoreVendors()
      refetchVendor();

      navigate(`/dashboard/vendor-account/Denied-Account/details/${id}`, {
        replace: true,
      });
    } catch (error) {
      toast.error(error?.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    setIsSubmitting(false);
  };

  const handleDeleteVendor = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteVendorAPI(vendorData?.vendor?._id);

      toast.success(result?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      navigate(-1);
      // removeSingleRoleFromCache(vendorIdToDelete);
    } catch (error) {
      toast.error(error?.message, {
        style: {
          border: "1px solid oklch(88.5% 0.062 18.334)",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "oklch(39.6% 0.141 25.723)",
          fontSize: "16px",
          width: "500px",
        },
      });
    }
    setDeleteModal(false);
    setIsDeleting(false);
  };

  return (
    <div className="account">
      {/* <div className="headers">
        <h2 className="ct-staff-title">Vendor Approval</h2>
       
      </div> */}

      {isDeleteModal && (
        <DeleteModal
          setDeleteModel={setDeleteModal}
          handleDelete={handleDeleteVendor}
          itemName={deleteVendorName}
          item="Vendor"
          isDeleting={isDeleting}
        />
      )}

      <div>
        <div>
          <div className="ct-staff-form-con1">
           <div style={{backgroundColor:"pink", padding:"1rem"}}>
            <div  style={{backgroundColor:"yellow", width:"45%", display:"flex",}}>
               <span style={{width:"5rem",
                          height:"5rem", 
                          borderRadius:"50%", 
                          border:"1px solid black",
                          display:"inline-flex",justifyContent:"center", alignContent:"center",padding:"2rem"}}>
                                   <img
                                      src={imgIcon}
                                      alt=" imgIcon"
                                      style={{ width: "16px", height: "16px" }}
                                    />
                  </span>
                  <div style={{display:"grid", marginLeft:"3rem", gap:"0.3rem"}}>
                    <div style={{fontSize:"2rem",fontWeight:"700"}}>Ishtari Ghana LTD</div>
                    <div style={{ fontSize:"1.2rem"}}>ishtarighana@gmail.com</div>
                    <button style={{fontsize:"0.8rem"}}>Approved</button>
                  </div>
            </div>
              <div className="buttons">
                <button
                className="btn-create"
                onClick={() => {
                  
                  onApproveStaff({
                    id,
                    status: "DENIED",
                  });
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? <BeatLoader color="white" /> : "Deny Approval"}
              </button>
              <button
                className="btn-cancel"
                onClick={() => {
                  setDeleteVendorName(
                    vendorData?.vendor?.businessInfo?.companyName
                  );
                  setDeleteModal(true);
                }}
                disabled={isDeleteModal}
              >
               Delete Account 
              </button>
            </div>
           </div>
            <div className="form-section1">
              <h3>Business Information </h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Business Name"
                  value={vendorData?.vendor?.businessInfo?.companyName}
                />
                <TextItem
                  title="Business Address"
                  value={vendorData?.vendor?.businessInfo?.businessAddress}
                />

                <TextItem
                  title="Country & City of Operation"
                  value={vendorData?.vendor?.businessInfo?.country_city}
                />
                <TextItem
                  title="Business Registration Number"
                  value={
                    vendorData?.vendor?.businessInfo?.businessRegistrationNumber
                  }
                />
                <TextItem
                  title="Business Type"
                  value={vendorData?.vendor?.businessInfo?.businessType}
                />
                <TextItem
                  title="Years in Operation"
                  value={vendorData?.vendor?.businessInfo?.yearsInOpertion}
                />
              </div>
            </div>

            <div className="form-section1">
              <h3>Contact Details</h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Contact Person Name"
                  value={vendorData?.vendor?.contactDetails?.name}
                />
                <TextItem
                  title="Contact Phone Number"
                  value={vendorData?.vendor?.contactDetails?.phoneNumber}
                />
                {/* <TextItem
                  title="Alternate Phone Number"
                  value={vendorData?.vendor?.contactDetails?.phoneNumber}
                /> */}
                <TextItem
                  title="Business Website"
                  value={
                    vendorData?.vendor?.businessInfo?.webApplicationDomainName
                  }
                />
                <TextItem
                  title="Contact Email"
                  value={vendorData?.vendor?.contactDetails?.email}
                />
                <TextItem title="Social Media Links" value={""} />
              </div>
            </div>

            <div className="form-section1">
              <h3>Payment & Billing</h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Bank Name"
                  value={
                    vendorData?.vendor?.financialDetails?.bankAccountDetails
                      ?.bankName
                  }
                />
                <TextItem
                  title="Bank Account Number"
                  value={
                    vendorData?.vendor?.financialDetails?.bankAccountDetails
                      ?.accountNumber
                  }
                />
                <TextItem
                  title="Bank Account Recipient Name"
                  value={
                    vendorData?.vendor?.financialDetails?.bankAccountDetails
                      ?.recipientName
                  }
                />
                <TextItem
                  title="Mobile Money Number"
                  value={
                    vendorData?.vendor?.financialDetails?.mobileMoneyAccount
                      ?.phoneNumber
                  }
                />

                <TextItem
                  title="Mobile Money Recipient Name"
                  value={
                    vendorData?.vendor?.financialDetails?.mobileMoneyAccount?.recipientName
                  }
                />
              </div>
            </div>

            <div className="form-section1">
              <h3>Document Upload</h3>

              <div className="personal-info-sec-doc">
                <div>
                  <div className="vd-doc-title">Company Logo</div>

                  <div className="vd-doc ">
                    <img src={vendorData?.vendor?.businessInfo?.logo} />
                  </div>
                </div>

                {/* <div>
                  <div className="vd-doc-title">Valid ID of Contact Person</div>
                  <div className="vd-doc"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
