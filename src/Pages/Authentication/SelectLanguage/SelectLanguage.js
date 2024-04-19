import React from "react";
import "./SelectLanguage.css";
// import bgImage from '../../Assets/Images/Bg.png';
import Radio from "@mui/material/Radio";
import bgImage from "../../../Assets/Images/Bg.png";

export const SelectLanguage = () => {
  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
          height: "100vh",
          backgroundSize: "100% 100%",
          fontFamily: "",
        }}
      >
        <div className="select-language-container">
          <div className="p-4">
            <h1 className="form-title">Select app language</h1>
            <p className="form-description">
              Select language for you entire application{" "}
            </p>
          </div>

          <div>
            <div className="d-flex align-items-center justify-content-center">
              <div className="language-card">
                <div className="d-flex align-items-center justify-content-around mt-2">
                  <span className="text-light ms-2 fs-14">English</span>
                  <Radio
                    //   checked={selectedValue === 'a'}
                    //   onChange={}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    style={{ color: "white" }}
                  />
                </div>

                <h1 className="text-center text-light card-title">A</h1>
              </div>
              <div className="language-card ms-4">
                <div className="d-flex align-items-center justify-content-around mt-2">
                  <span className="text-light ms-2 fs-14">Malaysian</span>
                  <Radio
                    //   checked={selectedValue === 'a'}
                    //   onChange={}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    style={{ color: "white" }}
                  />
                </div>
                <h1 className="text-center text-light card-title">M</h1>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <div className="language-card">
                <div className="d-flex align-items-center justify-content-around mt-2">
                  <span className="text-light ms-2 fs-14">Thai</span>
                  <Radio
                    //   checked={selectedValue === 'a'}
                    //   onChange={}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    style={{ color: "white" }}
                  />
                </div>
                <h1 className="text-center text-light card-title">แ</h1>
              </div>
              <div className="language-card ms-4">
                <div className="d-flex align-items-center justify-content-around mt-2">
                  <span className="text-light ms-2 fs-14">Indonesian</span>
                  <Radio
                    //   checked={selectedValue === 'a'}
                    //   onChange={}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    style={{ color: "white" }}
                  />
                </div>
                <h1 className="text-center text-light card-title">I</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
