import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Form from "./components/form/Form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  editBlog,
  fetchSingleBlog,
  setEditStatus,
} from "../../../store/blogSlice";

const EditBlog = () => {
  const [data1, setData1] = useState({
    title: "",
    subtitle: "",
    category: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, editstatus } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, [id]);
  useEffect(() => {
    if (data) {
      setData1({
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        description: data.description,
        image: data.image,
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1({
      ...data,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventdefault();
    dispatch(editBlog(data, id));
  };
  useEffect(() => {
    if (editstatus === true) {
      dispatch(setEditStatus(null));
      navigate(`/blog/${id}`);
    }
  });
  return (
    <Layout>
      <Form type="Edit"  onSubmit={handleSubmit}/>
    </Layout>
  );
};

export default EditBlog;
