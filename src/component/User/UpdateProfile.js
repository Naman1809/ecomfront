import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import MailOutllineIcon from "@mui/icons-material/MailOutline"
import FaceIcon from "@mui/icons-material/Face"

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
// import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  // const alert = useAlert();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.jpg");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, navigate, user, isUpdated]);

  return (
    <Fragment>
   {loading?<Loader/>:(
    <Fragment>
    <MetaData title="Update Profile" />
  <div className="updateProfileContainer">
    <div className="updateProfileBox">
      <h2 className="updateProfileHeading">Update Profie</h2>
      <form
        className="updateProfileForm"
        encType="multipart/form-data"
        onSubmit={updateProfileSubmit}
      >
        <div className="updateProfileName">
          <FaceIcon />
          <input
            type="text"
            placeholder="Name"
            required
            name="name"
            value={name}
            onChange={(e) =>setName(e.target.value)}
          />
        </div>
        <div className="updateProfileEmail">
          <MailOutllineIcon />
          <input
            type="email"
            placeholder="Email"
            required
            name="email"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
          />
        </div>

        <div id="updateProfileImage">
          <img src={avatarPreview} alt="Avatar Preview" />
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={updateProfileDataChange}
          />
        </div>
        <input
          type="submit"
          value="Update"
          className="updateProfileBtn"
          disabled={loading ? true : false}
        />
      </form>
    </div>
  </div>
</Fragment>
   )}
   </Fragment>
  );
};

export default UpdateProfile;
