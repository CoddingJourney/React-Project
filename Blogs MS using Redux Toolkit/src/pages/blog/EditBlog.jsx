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
  const { data, editStatus } = useSelector((state) => state.blog);
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
  // console.log(data1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData1({
      ...data1,
      [name]: name === "image" ? e.target.files[0] : value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editBlog(data1, id));
  };
  useEffect(() => {
    if (editStatus === true) {
      dispatch(setEditStatus(null));
      navigate(`/blog/${id}`);
    }
  }, [editStatus]);
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto p-4 bg-[#f2f2f2]">
          <h2 className="text-center text-4xl mt-5 font-bold">Edit Blog</h2>{" "}
          <br />
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Title
            </label>
            <input
              value={data1.title}
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="subtitle"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Subtitle
            </label>
            <input
              value={data1.subtitle}
              type="text"
              id="subtitle"
              name="subtitle"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              value={data1.category}
              id="category"
              name="category"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              value={data1.description}
              name="description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              rows="6"
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="block text-lg font-medium text-gray-800 mb-1"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
              // value={data1.image}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default EditBlog;
