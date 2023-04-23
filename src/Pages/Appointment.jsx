import React, { useState, useEffect } from "react";
import img from "../assets/nurse1.png";
import { db } from "../DbLayer/firebase-config";
import { collection, getDocs, doc, setDoc } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
const Appointment = () => {
  const { employeeType, id } = useParams();
  const [emp, setEmp] = useState([]);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    age: null,
    date:new Date(),
    prevIllness:false,
    gender: "",
  });

  const handleDateChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      date: event.target.value,
    }));
  };const handleIllnessChange = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      prevIllness: event.target.checked,
    }));
  };

  const employeeCollectionRef = collection(db, employeeType);

  useEffect(() => {
    const getEmployees = async () => {
      const data = await getDocs(employeeCollectionRef);
      setEmp(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEmployees();
  }, []);

  const found =
    emp &&
    emp.find((obj) => {
      return obj.id === id;
    });

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });
  };

  const submitData = async (e) => {
    e.preventDefault();

    await setDoc(doc(db, "appointments", userData.phone), {
      ...userData,
    });
  };
  return (
    <div>
      {found && (
        <section className="contactus-section">
          <div className="container card my-5">
            <div className="row">
              <div className="col-12 col-lg-10 mx-auto">
                <div className="row">
                  <div className="contact-leftside col-12 col-lg-5">
                    <h1 className="main-heading fw-bold">
                      Book An Appointment
                    </h1>
                    <p className="main-hero-para">
                      {found.name} is one of the most competent {employeeType}.
                      Enter your correct information so that we can set an
                      appointment with {found.name}.
                    </p>
                    <figure>
                      <img src={img} alt="contatUsImg" className="img-fluid" />
                    </figure>
                  </div>

                  {/* right side contact form  */}
                  <div className="contact-rightside col-12 col-lg-7 my-5">
                    <form method="POST">
                      <div className="row">
                        <div className="col-12 col-lg-6 my-1">
                          <input
                            type="text"
                            name="firstName"
                            id=""
                            className="form-control"
                            placeholder="First Name"
                            value={userData.firstName}
                            onChange={postUserData}
                          />
                        </div>
                        <div className="col-12 col-lg-6 my-1">
                          <input
                            type="text"
                            name="lastName"
                            id=""
                            className="form-control"
                            placeholder="Last Name"
                            value={userData.lastName}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-lg-6 my-1">
                          <input
                            type="text"
                            name="phone"
                            id=""
                            className="form-control"
                            placeholder="Phone Number "
                            value={userData.phone}
                            onChange={postUserData}
                          />
                          <input
                            type="text"
                            name="gender"
                            id=""
                            className="form-control"
                            placeholder="Gender "
                            value={userData.gender}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12  my-1">
                          <input
                            type="number"
                            name="age"
                            id=""
                            className="form-control"
                            placeholder="age "
                            value={userData.age}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      <div className="row my-1">
                        <div className="col-12 ">
                          <input
                            type="text"
                            name="address"
                            id=""
                            className="form-control"
                            placeholder="Add Address"
                            value={userData.address}
                            onChange={postUserData}
                          />
                        </div>
                        <div className="col-12 my-1">
                          <input
                            type="text"
                            name="city"
                            id=""
                            className="form-control"
                            placeholder="Add City"
                            value={userData.city}
                            onChange={postUserData}
                          />
                        </div>
                      </div>
                      <div className="col-12 my-1">
                      <label>
                        Appointment Date:
                        <input
                          type="date"
                          value={userData.date}
                          onChange={handleDateChange}
                        />
                      </label>
                      
                      <br />
                      <label>
                        Do you have any previous illness?
                        <input
                          type="checkbox"
                          checked={userData.prevIllness}
                          onChange={handleIllnessChange}
                        />
                      </label>
                      <br />
                      </div>
                    
                       
                      
                      <button
                        type="submit"
                        className="btn btn-success w-100"
                        onClick={submitData}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Appointment;
