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

export default function ViewDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteVendorName, setDeleteVendorName] = useState("");
  const [statusSwitch, setStatusSwitch] = useState("");

  const [isDenying, setIsDenying] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const status = location?.state?.status;

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

// Extract vendor name and email from your vendorData
const vendorName = vendorData?.vendor?.businessInfo?.companyName || "Vendor Name";
const vendorEmail = vendorData?.vendor?.contactDetails?.email || "vendor@email.com";

  const { fetchMore: fetchMoreVendors } = useQuery(GET_ALL_VENDORS, {
    variables: {
      offset: 0,
      limit: 100,
      status: status,
    },
  });

  const onApproveStaff = async (data) => {
    try {  
        setIsApproving(true);
     
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

      navigate(`/dashboard/vendor-account/Approved-Account/details/${id}`, {
          replace: true,
        });

      removeSingleVendrFromCache(id);
      // fetchMoreVendors()
      refetchVendor();
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
    setIsApproving(false);
  };

    const onDenyStaff = async (data) => {
    try {
        setIsDenying(true);

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

        navigate(`/dashboard/vendor-account/Denied-Account/details/${id}`, {
          replace: true,
        });
      

      removeSingleVendrFromCache(id);
      // fetchMoreVendors()
      refetchVendor();
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
    setIsDenying(false);
 
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
      <div className="vd-pending-headers">
        <h2 className="ct-staff-title">Vendor Approval</h2>
        <button className="btn-new-role" onClick={(e) =>setDeleteModal(true)}>
          Delete Account
        </button>
      </div>

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
              <div style={{backgroundColor:"white", padding:"1rem"}}>
                                    <div  style={{backgroundColor:"white", width:"45%", display:"flex",
                                      justifyContent:"flex-start", alignItems:"center", marginTop:"2rem",padding:"1.5re"}}>
                                       <span style={{width:"6rem",
                                                  height:"6rem", 
                                                  borderRadius:"50%", 
                                                  border:"1px solid black",
                                                  display:"inline-flex",justifyContent:"center", alignContent:"center",padding:"2rem"}}>
                                                           <img
                                                              src={imgIcon}
                                                              alt=" imgIcon"
                                                              style={{ width: "16px", height: "16px" }}
                                                            />
                                          </span>
                                          <div style={{display:"grid", marginLeft:"2rem", gap:"0.3rem"}}>
                                            <div style={{fontSize:"2rem",fontWeight:"700"}}>{vendorName}</div>
                                            <div style={{ fontSize:"1.2rem"}}>{vendorEmail}</div>
                                            <button style={{fontsize:"0.8rem"}}>Pending</button>
                                          </div>
                                    </div>
                                     
                        <div className="buttons">
              <button
                className="btn-cancel"
                onClick={() => {
                  onDenyStaff({
                    id,
                    status: "DENIED",
                  });
                  
                }}
                disabled={isDenying}
              >
                {isDenying ? <BeatLoader color="white" /> : "Deny Approval"}
              </button>
              <button
                className="btn-create"
                onClick={() => {
                  onApproveStaff({
                    id,
                    status: "APPROVE",
                  });
                  setStatusSwitch("APPROVED");
                }}
                disabled={isApproving}
              >
                {isApproving ? (
                  <BeatLoader color="white" />
                ) : (
                  "Approve Application"
                )}
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
