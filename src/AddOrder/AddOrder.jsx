import TextInput from "../Components/form/TextInput";
import { Form, useForm, useFormContext, FormProvider } from "react-hook-form";
import { addOrderSchema } from "./addOrderSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./addOrder.module.css";
import ImageUpload from "./ImageUpload";
import { BeatLoader } from "react-spinners";
import { orderUploadAPI } from "../api/order";
import toast from "react-hot-toast";
import UploadByCSVOrExcel from "./UploadByCSVOrExcel";
import { useSelector } from "react-redux";

export default function AddOrder() {
  const useFormmethods = useForm({ resolver: zodResolver(addOrderSchema) });
  const viewAbleTabs = useSelector((state) => state.staffAuth?.viewAbleTabs);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors: validationError, isSubmitting },
  } = useFormmethods;

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("description", data.description);
    formData.append("recipientName", data?.recipient);
    formData.append("recipientNumber", data?.phoneNumber);
    formData.append("paymentAmount", data?.orderPrice);
    if (data?.deliveryPrice) {
      formData.append("deliveryFee", data?.deliveryPrice);
    }
    formData.append("destination", data?.destination);

    const source = {
      type: "SELF",
    };

    formData.append("source", JSON.stringify(source));

    if (data.description) {
      formData.append("productDescription", data?.description);
    }

    if (data?.productImage) {
      formData.append("productImage", data?.productImage);
    }

    try {
      const result = await orderUploadAPI(formData);

      toast.success(result?.data?.message, {
        style: {
          border: "1px solid #17654F",
          // backgroundColor:"oklch(88.5% 0.062 18.334)",
          color: "black",
          fontSize: "16px",
          width: "500px",
        },
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
  };

  return (
    <FormProvider {...useFormmethods}>
      <div className={styles.topHeader}>
        <div className={styles.headerTitle}>Add Order manually</div>
        <div>
          <UploadByCSVOrExcel />
        </div>
      </div>

      <div>
        <div className="ct-form-container" style={{ paddingBottom: "1rem" }}>
          <form className="ct-staff-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="ct-staff-form-con1">
              <div className="form-section1">
                <h3 className={styles.subTitle}>Recipient Details </h3>
                <div className="personal-info-sec">
                  <div className="input-con">
                    <TextInput
                      title="Recipient"
                      name="recipient"
                      placeholder="name"
                      isRequired={true}
                      register={() => register("recipient")}
                    />
                    {validationError?.recipient && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.recipient?.message}
                      </h2>
                    )}
                  </div>

                  <div className="input-con">
                    <TextInput
                      title="Recipient's Telephone"
                      name="phoneNumber"
                      placeholder="number"
                      isRequired={true}
                      register={() => register("phoneNumber")}
                    />
                    {validationError?.phoneNumber && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.phoneNumber?.message}
                      </h2>
                    )}
                  </div>

                  <div className="input-con">
                    <TextInput
                      title="Destination"
                      name="destination"
                      placeholder="destination"
                      isRequired={true}
                      register={() => register("destination")}
                    />
                    {validationError?.destination && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.destination?.message}
                      </h2>
                    )}
                  </div>
                </div>
              </div>

              <div className="form-section1">
                <h3 className={styles.subTitle}>Payment & Billing</h3>
                <div className="personal-info-sec">
                  <div className="input-con">
                    <TextInput
                      title="Order Price(GHC)"
                      name="orderPrice"
                      // type={"number"}
                      placeholder="amount"
                      isRequired={true}
                      register={() => register("orderPrice")}
                    />
                    {validationError?.orderPrice && (
                      <h2
                        style={{
                          color: "red",
                          marginTop: "-1rem",
                          fontSize: "1.3rem",
                          fontWeight: "450",
                        }}
                      >
                        {validationError?.orderPrice?.message}
                      </h2>
                    )}
                  </div>
                  {!viewAbleTabs?.includes("Vendor") && (
                    <div className="input-con">
                      <TextInput
                        title="Delivery Fee(GHC)"
                        // type={"number"}
                        name="contact"
                        placeholder="amount"
                        isRequired={true}
                        register={() => register("deliveryPrice")}
                      />
                      {validationError?.deliveryPrice && (
                        <h2
                          style={{
                            color: "red",
                            marginTop: "-1rem",
                            fontSize: "1.3rem",
                            fontWeight: "450",
                          }}
                        >
                          {validationError?.deliveryPrice?.message}
                        </h2>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div>
                  <h3 className={styles.subTitle}>Product description</h3>
                  <div>
                    <label htmlFor="description" style={{ fontSize: "16px" }}>
                      Enter product description
                    </label>
                    <br />
                    <textarea
                      className="text-input"
                      style={{ height: "150px" }}
                      {...register("description")}
                      rows={5}
                    ></textarea>
                  </div>
                  <div>
                    
                  </div>
                </div>

                {/* <div>
                  <label htmlFor="description" style={{ fontSize: "16px" }}>
                    Unit Quantity
                  </label>
                  <br />
                  <input type="number" className={styles.unit_quantity}/>
                </div> */}
              </div>

              <div className="form-section1">
                <h3 className={styles.subTitle}>Document Upload</h3>

                <div>
                  <div className={styles.doc_title}>Photo</div>
                  <div>
                    <ImageUpload />
                  </div>
                </div>
              </div>
              <div className="account-create-btn">
                <button
                  className="btn-create"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <BeatLoader color="white" /> : "Upload"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
}
