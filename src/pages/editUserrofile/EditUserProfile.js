import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getUser,
  handleUserChange
} from "../../stores/user/userSlice";
import { useNavigate } from "react-router";
import { refreshUser } from "../../stores/auth/authSlice";
import { toast } from "react-toastify";

function EditUserProfile() {
  const { user } = useSelector((store) => store.auth);
  const { name, email } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  useEffect(() => {
    dispatch(getUser(user.userId));
     // eslint-disable-next-line
  }, []);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await dispatch(
        editUser({ userId: user.userId, user: { name, email, password } })
      ).unwrap();
      dispatch(refreshUser());
      navigate("/userprofile");
    }
  }

  return (
    <>
      <div className="container my-5">
        <div className="d-flex align-items-center justify-content-center">
          <img
            src={require("../../assets/profile.jpg")}
            alt="profile-picture text-center"
            className="mx-auto mb-4"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 mb-4 col-lg-6 col-12 mx-auto">
            <label htmlFor="name" className="form-label mb-2 fw-bold fs-5">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className={`form-control fs-6 ${nameFocus ? "shadow" : ""}`}
              required
              value={name}
              onChange={handleUserInput}
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
            />
          </div>

          <div className="mt-4 mb-4 col-lg-6 col-12 mx-auto ">
            <label htmlFor="email" className="form-label mb-2 fw-bold fs-5">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              className={`form-control fs-6 ${emailFocus ? "shadow" : ""}`}
              required
              value={email}
              onChange={handleUserInput}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>

          <div className="mt-4 mb-4 col-lg-6 col-12 mx-auto">
            <label htmlFor="password" className="form-label mb-2 fw-bold fs-5">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className={`form-control fs-6 ${passwordFocus ? "shadow" : ""}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </div>

          <div className="mt-4 mb-4 col-lg-6 col-12 mx-auto">
            <label
              htmlFor="confirmPasword"
              className="form-label mb-2 fw-bold fs-5"
            >
              Confirm Pasword
            </label>
            <input
              type="password"
              name="cofirmPassword"
              id="confirmPassword"
              placeholder="Confirm Password"
              className={`form-control fs-6 ${
                confirmPasswordFocus ? "shadow" : ""
              }`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setConfirmPasswordFocus(true)}
              onBlur={() => setConfirmPasswordFocus(false)}
            />
          </div>

          <div className="text-center mt-5">
            <button
              className="btn btn-primary shadow col-lg-4 col-5"
              type="submit"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserProfile;
