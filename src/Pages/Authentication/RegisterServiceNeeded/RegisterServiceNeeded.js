import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import bgImage from "../../../Assets/Images/Bg.png";
import { servicesNeeded } from "../../../api/Services/patient/common";
import { useNavigate } from "react-router-dom";
import {
  updateService,
  viewAllServices,
  viewServices,
} from "../../../api/Services/patient/services";

export const RegisterServiceNeeded = ({
  modalValue,
  closeServiceNeeded,
  servicesList,
}) => {
  const [services, setServices] = useState([]);
  const [serviceList, setServiceList] = useState(servicesList);
  const [serviceAdded, setServiceAdded] = useState([]);
  const [newServiceAdded, setNewServiceAdded] = useState(serviceAdded);
  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // setServiceList(servicesList);
    console.log(newServiceAdded);
    console.log(serviceAdded);
    console.log(serviceList);
    const updatedServiceList = serviceList.map((item) => {
      const checkService = newServiceAdded.find(
        (service) => service.services === item.services
      );
      return checkService ? { ...item, checked: true } : item;
    });
    setServiceList(updatedServiceList);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = services.join();
    const serviceData = {
      services: newService,
    };
    if (services.length === 0) {
      setErrorMsg(!errorMsg);
    } else {
      if (!modalValue) {
        servicesNeeded(serviceData).then((res) => {
          console.log(res);
          if (res.status === "success") {
            navigate("/register-member-details");
          }
        });
      } else {
        updateService(serviceData).then((res) => {
          if (res) {
            viewServices().then((res) => {
              const addedServices = res.data;
              // setServiceAdded(addedServices);

              // setNewServiceAdded(serviceAdded);
              setServiceAdded((prev) => {
                const filteredServices = res.data.filter(
                  (service) =>
                    !prev.some(
                      (existingService) =>
                        existingService.services === service.services
                    )
                );
                return prev.concat(filteredServices);
              });
              const updatedServiceList = serviceList.map((item) => {
                const checkService = newServiceAdded.find(
                  (service) => service.services === item.services
                );
                return checkService ? { ...item, checked: true } : item;
              });
              setServiceList(updatedServiceList);
            });
          }
        });
      }
      setErrorMsg(false);
    }
  };
  console.log(newServiceAdded);
  console.log(serviceAdded);
  console.log(serviceList);
  const handleChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setServices((prevServices) => [...prevServices, value]);
    } else {
      setServices((prevServices) =>
        prevServices.filter((service) => service !== value)
      );
    }

    if (services) {
      setErrorMsg(false);
    }
  };

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={
          modalValue
            ? { padding: "20px" }
            : {
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
                height: "100vh",
                backgroundSize: "100% 100%",
                fontFamily: "",
              }
        }
      >
        <div>
          <h1 className="form-title">Service I need</h1>
          {!modalValue && (
            <div className="form-description">Enter patient details</div>
          )}

          <div className="mt-4">
            <form style={{ maxWidth: "450px" }} onSubmit={handleSubmit}>
              {modalValue ? (
                <div>
                  {serviceList.map((item) => (
                    <div className="mt-2">
                      <input
                        type="checkbox"
                        id={item.id}
                        className="form-check-input"
                        onChange={handleChange}
                        value={item.services}
                        checked={item.checked}
                      />
                      <label
                        htmlFor={item.id}
                        className="login-form-label ms-2"
                      >
                        {item.services}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="personalCare"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Personals care"
                    />
                    <label
                      htmlFor="personalCare"
                      className="login-form-label ms-2"
                    >
                      Personals care
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="domesticAssistance"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Domestic Assistance"
                    />
                    <label
                      htmlFor="domesticAssistance"
                      className="login-form-label ms-2"
                    >
                      Domestic Assistance
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="socialSupport"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Social Support & Community Participation"
                    />
                    <label
                      htmlFor="socialSupport"
                      className="login-form-label ms-2"
                    >
                      Social Support & Community Participation
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="specialistCare"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Specialist Care"
                    />
                    <label
                      htmlFor="specialistCare"
                      className="login-form-label ms-2"
                    >
                      Specialist Care
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="outAndAbout"
                      placeholder="confirm"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Out and About Transport"
                    />
                    <label
                      htmlFor="outAndAbout"
                      className="login-form-label ms-2"
                    >
                      Out and About Transport
                    </label>
                  </div>

                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="reliefRespite"
                      placeholder="confirm"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Relief Respite Care"
                    />
                    <label
                      htmlFor="reliefRespite"
                      className="login-form-label ms-2"
                    >
                      Relief Respite Care
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="coachingCounselling"
                      placeholder="confirm"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Coaching & Counselling"
                    />
                    <label
                      htmlFor="coachingCounselling"
                      className="login-form-label ms-2"
                    >
                      Coaching & Counselling
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      type="checkbox"
                      id="disabilityProducts"
                      placeholder="confirm"
                      className="form-check-input"
                      onChange={handleChange}
                      value="Disability Products"
                    />
                    <label
                      htmlFor="disabilityProducts"
                      className="login-form-label ms-2"
                    >
                      Disability Products
                    </label>
                  </div>
                </div>
              )}

              {errorMsg && (
                <p
                  className="text-danger"
                  style={{ maxWidth: "450px", marginTop: "10px" }}
                >
                  Select atleast one Service
                </p>
              )}
              {!modalValue ? (
                <div className="mt-4">
                  <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{
                      borderRadius: "40px",
                      backgroundColor: "#024FAA",
                      fontSize: "16px",
                      textTransform: "none",
                    }}
                  >
                    Next
                  </Button>
                </div>
              ) : (
                <div className="mt-3">
                  <Button
                    variant="outlined"
                    onClick={closeServiceNeeded}
                    sx={{ padding: "10px 60px", borderRadius: "40px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ padding: "10px 70px", borderRadius: "40px" }}
                  >
                    Add
                  </Button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
