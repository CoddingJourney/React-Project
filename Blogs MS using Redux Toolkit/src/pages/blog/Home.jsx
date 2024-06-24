import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Layout from "../../components/layout/Layout";
import Card from "./components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlog } from "../../../store/blogSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSelector((state) => state.blog);
  console.log(data);
  useEffect(() => {
    dispatch(fetchBlog());
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <h1>Loading .......</h1>;
  }
  return (
    <Layout>
      <div className="flex flex-wrap justify-center space-x-5 mt-6">
        {data &&
          data.map((data) => {
            return <Card key={data.id} data={data} />;
          })}
      </div>
    </Layout>
  );
};

export default Home;
