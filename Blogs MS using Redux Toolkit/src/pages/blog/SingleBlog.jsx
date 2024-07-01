import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  fetchSingleBlog,
  setDeleteStatus,
} from "../../../store/blogSlice";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { deletestatus, data } = useSelector((state) => state.blog);
  // console.log(data);
  useEffect(() => {
    dispatch(fetchSingleBlog(id));
  }, []);
  const handleDeleteBlog = () => {
    dispatch(deleteBlog(id));
  };
  useEffect(() => {
    if (deletestatus === true) {
      dispatch(setDeleteStatus(null));
      localStorage.getItem("jwttoken", token);
      navigate("/");
    }
  }, [deletestatus]);

  return (
    <Layout>
      <div className="bg-gray-100 dark:bg-gray-800 py-8 h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
              <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                <img
                  className="w-full h-full object-cover"
                  src={data?.imageUrl}
                  alt="Product Image"
                />
              </div>
              <div className="flex -mx-2 mb-4">
                <div className="w-1/2 px-2">
                  <Link to={`/blog/edit/${id}`}>
                    <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                      Edit
                    </button>
                  </Link>
                </div>
                <div onClick={handleDeleteBlog} className="w-1/2 px-2">
                  <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div className="md:flex-1 px-4">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {data?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4"></p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    SubTitle:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {data?.subtitle}
                  </span>
                </div>{" "}
                <br />
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Category:
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    {data?.category}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Product Description:
                </span>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                  {data?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleBlog;
