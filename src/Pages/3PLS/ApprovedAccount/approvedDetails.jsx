import { useNavigate, useLocation, useParams } from "react-router";
import TextItem from "../../../Components/TextItem";
import { useQuery } from "@apollo/client";
import { GET_3PL } from "../../../graphql/generalQueries";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { approve3PLAPI, delete3plAPI } from "../../../api/authentication";
import { removeSingle3PLFromCache } from "../../../graphql/graphqlConfiguration";
import toast from "react-hot-toast";
import Badge from "../../../Components/Badge/Badge";
import PrimaryButton from "../../../Components/buttons/PrimaryButton";
import PrimaryButtonOutline from "../../../Components/buttons/PrimaryButtonOutline";
import styles from "./ApprovedAccount.module.css";
import DeleteModal from "../../../Components/DeleteModal";

export default function T3plApprovedDetails3PL() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isApproving, setIsApproving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [statusSwitch, setStatusSwitch] = useState("");
  const [isDenying, setIsDenying] = useState(false);
  const [deleteVendorName, setDeleteVendorName] = useState("");
  const [isDeleteModal, setDeleteModal] = useState(false);

  const status = location?.state?.status;

  const {
    loading: T3plLoading,
    error: T3plError,
    data: T3plData,
    refetch: refetchT3pl,
  } = useQuery(GET_3PL, {
    variables: {
      id,
    },
  });

  const onDenyStaff = async (data) => {
    try {
      setIsDenying(true);

      const result = await approve3PLAPI(data);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
      });

      navigate(`/dashboard/3pls/Denied-Account/details/${id}`, {
        replace: true,
      });

      removeSingle3PLFromCache(id);
      refetchT3pl();
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

 const handleDelete3pl = async () => {
    try {
      setIsDeleting(true);

      const result = await delete3plAPI(id);

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
        <h2 className="ct-staff-title">3PL Approval</h2>
      </div> */}

      {
        isDeleteModal && (
          <DeleteModal
          setDeleteModel={setDeleteModal}
          handleDelete={handleDelete3pl}
          itemName={T3plData?.T3pl?.businessInfo?.companyName}
          item = "3PL"
          isDeleting={isDeleting}
          />
        )
      }


      <div>
        
        <div>
          <form className="ct-staff-form">
            <div className="ct-staff-form-con1">
              <div className={styles.headerContainer}>
                <Badge title={T3plData?.T3pl?.businessInfo?.companyName} subTitle={T3plData?.T3pl?.contactDetails?.email}  profileImg={T3plData?.T3pl?.businessInfo?.logo}/>
                <div className={styles.headerContainerButtons}>
                  <PrimaryButtonOutline onClick={()=>{
                  onDenyStaff({
                    id,
                    status:"DENIED"
                  })
                 }}
                 disabled={isDenying}
                 text={"Deny Approval"}
                 />
                 <PrimaryButton
                 onClick={
                  ()=>{
                    setDeleteModal(true)
                  }
                 }  
                 disabled={isDeleteModal}
                 text={"Delete Account"}
                 willOpenModal={true}
                 />
                </div>
              </div>

              <div className="form-section1">
                <h3>3PL Information</h3>

                <div className="personal-info-sec">
                  <TextItem
                    title="Company Name"
                    value={T3plData?.T3pl?.businessInfo?.companyName}
                  />
                  <TextItem
                    title="Business Registration Number"
                    value={T3plData?.T3pl?.businessInfo?.registrationNumber}
                  />

                  <TextItem
                    title="Region"
                    value={T3plData?.T3pl?.businessInfo?.region}
                  />

                  <TextItem
                    title="Steet Address"
                    value={T3plData?.T3pl?.businessInfo?.streetAddress}
                  />

                  <TextItem
                    title="GPS Address"
                    value={T3plData?.T3pl?.businessInfo?.gpsAddress}
                  />

                  <TextItem
                    title="Years in Operation"
                    value={T3plData?.T3pl?.businessInfo?.yearsInOpertion}
                  />
                </div>
              </div>

              <div className="form-section1">
                <h3>Contact Details</h3>

                <div className="personal-info-sec">
                  <TextItem
                    title="Primary Contact Person"
                    value={T3plData?.T3pl?.contactDetails?.name}
                  />
                  <TextItem
                    title="Phone Number"
                    value={T3plData?.T3pl?.contactDetails?.phoneNumber}
                  />
                  <TextItem
                    title="Office Email Address"
                    value={T3plData?.T3pl?.contactDetails?.email}
                  />
                  <TextItem
                    title="Contact Person Position(Role)"
                    value={T3plData?.T3pl?.contactDetails?.position}
                  />
                  <TextItem
                    title="Contact Person Ghana Card"
                    value={T3plData?.T3pl?.contactDetails?.ghanaCardNumber}
                  />

                  <TextItem
                    title="Office Line"
                    value={
                      T3plData?.T3pl?.contactDetails?.additionalPhoneNumber
                    }
                  />
                </div>
              </div>

              <div className="form-section1">
                <h3>Payment & Billing</h3>

                <div className="personal-info-sec">
                  <TextItem
                    title="Bank Name"
                    value={
                      T3plData?.T3pl?.financialDetails?.bankAccountDetails
                        ?.bankName
                    }
                  />
                  <TextItem
                    title="Bank Account Number"
                    value={
                      T3plData?.T3pl?.financialDetails?.bankAccountDetails
                        ?.accountNumber
                    }
                  />
                  <TextItem
                    title="Bank Account Recipient Name"
                    value={
                      T3plData?.T3pl?.financialDetails?.bankAccountDetails
                        ?.recipientName
                    }
                  />
                  <TextItem
                    title="Mobile Money Number"
                    value={
                      T3plData?.T3pl?.financialDetails?.mobileMoneyAccount
                        ?.phoneNumber
                    }
                  />

                  <TextItem
                    title="Mobile Money Recipient Name"
                    value={
                      T3plData?.T3pl?.financialDetails?.mobileMoneyAccount
                        ?.recipientName
                    }
                  />
                </div>
              </div>

              <div className="form-section1">
                <h3>Document Upload</h3>

                <div className="personal-info-sec-doc">
                  <div>
                    <div className="vd-doc-title">
                      Business Registration Certificate
                    </div>
                    <div className="vd-doc">
                      <img
                        src={T3plData?.T3pl?.businessInfo?.businessCertificate}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="vd-doc-title">Business Logo</div>
                    <div className="vd-doc">
                      <img src={T3plData?.T3pl?.businessInfo?.logo} />
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="buttons">
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
                  Delete
                </button>
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
                  {isSubmitting ? (
                    <BeatLoader color="white" />
                  ) : (
                    "Deny Approval"
                  )}
                </button>
              </div> */}

              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
