import { useNavigate, useLocation } from "react-router";
import TextItem from "../../../../Components/TextItem";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

import toast from "react-hot-toast";
import DeleteModal from "../../../../Components/DeleteModal";
import { GET_RIDER } from "../../../../graphql/generalQueries";
import { approveRiderAPI, deleteRiderAPI } from "../../../../api/authentication";
import { removeSingleRiderFromCache } from "../../../../graphql/graphqlConfiguration";

export default function RiderPendingDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isDeleting, setIsDeleting] = useState(false);

  const [isDeleteModal, setDeleteModal] = useState(false);
  const [deleteVendorName, setDeleteVendorName] = useState("");

   const [isDenying, setIsDenying] = useState(false);
   const [isApproving, setIsApproving] = useState(false);

  const {
    loading: riderLoading,
    error: riderError,
    data: riderData,
    refetch: refetchRider,
  } = useQuery(GET_RIDER, {
    variables: {
      id,
    },
  });


 const onApproveRider = async (data) => {
    try {  
        setIsApproving(true);
     
      const result = await approveRiderAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      navigate(`/rider/approved/details/${id}`, {
          replace: true,
        });

     removeSingleRiderFromCache(id)
     
      refetchRider()
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

    const onDenyRider = async (data) => {
    try {
        setIsDenying(true);

      const result = await approveRiderAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

        navigate(`/rider/denied/details/${id}`, {
          replace: true,
        });
      

 
      removeSingleRiderFromCache(id)
     
      refetchRider()
     
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


  const handleDeleteRider = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteRiderAPI(id);

      toast.success(result?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });
    //   removeSingleRiderFromCache(id)
      navigate(-1);
      
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
          handleDelete={handleDeleteRider}
          itemName={deleteVendorName}
          item="Rider"
          isDeleting={isDeleting}
        />
      )}

      <div>
        <div>
          <div className="ct-staff-form-con1">
            <div className="form-section1">
              <h3>Personal Information </h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Full Name"
                  value={riderData?.rider?.userProfile?.fullName}
                />
                <TextItem
                  title="Driver's License Number"
                  value={riderData?.rider?.driverLicenseNumber}
                />

                <TextItem
                  title="Gender"
                  value={riderData?.rider?.userProfile?.gender}
                />
                <TextItem
                  title="Date of Birth"
                  value={riderData?.rider?.userProfile?.dateOfBirth}
                />
                <TextItem
                  title="National ID"
                  value={
                    riderData?.rider?.userProfile?.nationalIdentification
                      ?.number
                  }
                />
                <TextItem
                  title="Years in driving"
                  value={
                    riderData?.rider?.professionalDetails
                      ?.yearsOfDrivingExperience
                  }
                />
              </div>
            </div>

            <div className="form-section1">
              <h3>Contact Details</h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Mobile Number"
                  value={riderData?.rider?.contactDetails?.phoneNumber}
                />
                <TextItem
                  title="Email Address"
                  value={riderData?.rider?.contactDetails?.email}
                />
                {/* <TextItem
                  title="Alternate Phone Number"
                  value={vendorData?.vendor?.contactDetails?.phoneNumber}
                /> */}
                <TextItem
                  title="Emergency Contact Name"
                  value={riderData?.rider?.contactDetails?.emergencyContactName}
                />
                <TextItem
                  title="Addiontal Mobile Number (Optional)"
                  value={
                    riderData?.rider?.contactDetails?.additionalPhoneNumber
                  }
                />
                <TextItem
                  title="Residential Address"
                  value={riderData?.rider?.contactDetails?.residentailAddress}
                />

                <TextItem
                  title="Emergency Contact Number"
                  value={
                    riderData?.rider?.contactDetails?.emergencyContactNumber
                  }
                />
              </div>
            </div>

            <div className="form-section1">
              <h3>Vehicle Details</h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Vehicle Type and Model"
                  value={riderData?.rider?.vehicleInfo?.vehicleType}
                />
                <TextItem
                  title="Vehicle Registration Number"
                  value={riderData?.rider?.vehicleInfo?.registrationNumber}
                />
                {/* <TextItem
                  title="Alternate Phone Number"
                  value={vendorData?.vendor?.contactDetails?.phoneNumber}
                /> */}
                {/* <TextItem
                  title="License Expiry Date"
                  value={
                   "pp"
                  }
                /> */}
              </div>
            </div>

            <div className="form-section1">
              <h3>Payment & Billing</h3>

              <div className="personal-info-sec">
                <TextItem
                  title="Bank Name"
                  value={
                    riderData?.rider?.financialDetails?.bankAccountDetails
                      ?.bankName
                  }
                />
                <TextItem
                  title="Bank Account Number"
                  value={
                    riderData?.rider?.financialDetails?.bankAccountDetails
                      ?.accountNumber
                  }
                />
                <TextItem
                  title="Bank Account Recipient Name"
                  value={
                    riderData?.rider?.financialDetails?.bankAccountDetails
                      ?.recipientName
                  }
                />
                <TextItem
                  title="Mobile Money Number"
                  value={
                    riderData?.rider?.financialDetails?.mobileMoneyAccount
                      ?.phoneNumber
                  }
                />

                <TextItem
                  title="Mobile Money Recipient Name"
                  value={
                    riderData?.rider?.financialDetails?.mobileMoneyAccount
                      ?.recipientName
                  }
                />
              </div>
            </div>

            <div className="form-section1">
              <h3>Document Upload</h3>

              <div className="personal-info-sec-doc">
                <div>
                  <div className="vd-doc-title">Driver License</div>

                  <div className="vd-doc ">
                    <img
                      src={
                        riderData?.rider?.professionalDetails?.drivingLicenseImg
                      }
                    />
                  </div>
                </div>

                <div>
                  <div className="vd-doc-title">Company Logo</div>

                  <div className="vd-doc ">
                    <img
                      src={riderData?.rider?.nationalIdentification?.image}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="buttons">
              <button
                className="btn-cancel"
                onClick={() => {
                  onDenyRider({
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
                  onApproveRider({
                    id,
                    status: "APPROVE",
                  });
                 
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
        </div>
      </div>
    </div>
  );
}
