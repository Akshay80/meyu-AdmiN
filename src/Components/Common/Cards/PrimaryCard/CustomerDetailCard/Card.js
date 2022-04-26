import React, { useState, useEffect } from "react";
import UserImage from "../../../../../Assets/Images/blank-user.png";
import "./Card.scss";
import { discontinueCustomer } from "../../../../../Services/customerServices";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const CustomerCard = ({
  customerDetail,
  customerImage,
  customerId,
  customerVerify,
  customerReject,
  totalCompleteOrders , totalAmount 
}) => {
  const [disState, setDisState] = useState();

  useEffect(() => {
    setDisState(`${customerVerify}`);
  }, [customerVerify]);

  // async function disCustomer() {
  //   if (`${disState}` === "true") {
  //     setDisState("false");
  //   } else {
  //     setDisState("true");
  //   }
  //   var params = {
  //     isVerified: disState,
  //   };
  //   await discontinueCustomer(customerId, params)
  //     .then((res) => {
  //       if (res.data.data.message === "User profile verified successfully.") {
  //         toast.success(res.data.data.message, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //         });
  //       }

  //       if (res.data.data.message === "User profile rejected successfully.") {
  //         toast.error(res.data.data.message, {
  //           position: "top-right",
  //           autoClose: 1000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: false,
  //           progress: 0,
  //         });
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }

  // const disContinue = () => {
  //   confirmAlert({
  //     title: disState === "true"? "Continue?": "Discontinue!",
  //     message: `Are you sure you want to ${disState === "true"? "continue with": "discontinue with"} ${customerDetail.fullName}?`,
  //     buttons: [
  //       {
  //         label: "Yes",
  //         className: "btn btn-danger",
  //         onClick: () => disCustomer(),
  //       },
  //       {
  //         label: "No",
  //         className: "btn btn-success",
  //       },
  //     ],
  //   });
  // };

  var testStr = customerImage;
var splitStr = testStr.substring(testStr.indexOf('http://13.213.151.153:8081/') + 27);

  return (
    <div className="container">
      <div className="card mb-3 p-3">
        <div className="row g-0">
          <div className="col-md-3 col-sm-12 align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center">
              {customerImage.includes("https://lh3.googleusercontent.com") === true ?   <img src={splitStr} className="img"
                alt="..."
                style={{ borderRadius: "50%", width: 100, height: 100 }}/>: <img
                src={
                  customerImage === `http://13.213.151.153:8081/null` || customerImage.includes("https://lh3.googleusercontent.com") === true
                    ? UserImage
                    : customerImage
                }
                className="img"
                alt="..."
                style={{ borderRadius: "50%", width: 100, height: 100 }}
              />}
            
              
            </div>
          </div>
          <div className="col-md-9 col-sm-12">
            <div>
              <div className="user-card-info d-flex mx-3 mt-2 align-items-center justify-content-between">
                <div className="info-x">
                  <h5 className="mb-1">{customerDetail?.firstName} {customerDetail?.lastName}</h5>
                  <p>{customerDetail?.phone}</p>
                  <p>{customerDetail?.email}</p>
                </div>
                {/* <div>
                  <button
                    className={
                      disState === "true"
                        ? "btn btn-outline-success shadow-none"
                        : "btn btn-outline-danger shadow-none"
                    }
                    type="button"
                    onClick={() => disContinue()}
                  >
                    {disState === "true" ? "Continue" : "Discontinue"}
                  </button>
                </div> */}
              </div>

              <div className="primary-card-info mx-3 mt-5 d-flex justify-content-between">
                <div className="info-xz">
                  <h5 className="mb-0">Completed Order</h5>
                  <h6>{totalCompleteOrders}</h6>
                </div>
                <div className="info-xz">
                  <h5 className="mb-0">Total Amount</h5>
                  <h6>{`$${totalAmount === null ? 0 : totalAmount}`}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerCard;
