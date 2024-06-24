import React from "react";

import Layout from "../../components/layout/Layout";
import Form from "./components/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../../../store/blogSlice";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { status } = useSelector((state) => state.blog);
  // console.log(status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddBlog = (data) => {
    dispatch(addBlog(data));
    navigate("/");
  };

  return (
    <Layout>
      <Form type="Create" onSubmit={handleAddBlog} />
    </Layout>
  );
};

export default AddBlog;
