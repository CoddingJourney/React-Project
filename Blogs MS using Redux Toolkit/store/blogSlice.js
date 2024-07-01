import { createSlice } from "@reduxjs/toolkit";
import statuses from "../src/globals/status/statuses";
import API from "../src/http";
const blogSlice = createSlice({
  name: "blog",
  initialState: {
    data: null,
    status: null,
    editstatus: null,
    deleteStatus: null,
  },
  reducers: {
    setBlog(state, action) {
      state.data = action.payload;
      // console.log(data);
    },

    setStatus(state, action) {
      state.status = action.payload;
    },
  },
  setDeleteStatus: (state, action) => {
    state.deleteStatus = action.payload;
  },
  setEditStatus: (state, action) => {
    state.editstatus = action.payload;
  },
});
export const { setStatus, setBlog, setEditStatus, setDeleteStatus } =
  blogSlice.actions;
export default blogSlice.reducer;
export function addBlog(data) {
  return async function addBlogThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    // console.log(localStorage.getItem("jwttoken"));
    try {
      const response = await API.post("blog", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        dispatch(setStatus(statuses.SUCCESS));
      } else {
        dispatch(setStatus(statuses.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(statuses.ERROR));
    }
  };
}
export function fetchBlog() {
  return async function fetchBlogThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const response = await API.get("blog");
      if (response.status === 200 && response.data.data.length > 0) {
        // console.log("Setting token:", response.data.token);

        dispatch(setBlog(response.data.data));
        dispatch(setStatus(statuses.SUCCESS));
      } else {
        dispatch(setStatus(statuses.ERROR));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setStatus(statuses.ERROR));
    }
  };
}

export const deleteBlog = (id) => {
  return async function deleteBlogThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const response = await API.delete(`blog/${id}`);
      if (response.status === 200) {
        dispatch(setDeleteStatus(true));
        // dispatch(setStatus(statuses.SUCCESS));
      } else {
        dispatch(setDeleteStatus(null));
        // dispatch(setStatus(statuses.ERROR));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setDeleteStatus(false));

      // dispatch(setStatus(statuses.ERROR));
    }
  };
};
export function editBlog(id, data) {
  // console.log("hello");
  return async function editBlogThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const response = await API.patch(`blog/${id}`, data);

      if (response.status === 200) {
        // console.log("Setting token:", response.data.token);

        dispatch(setEditStatus(true));
      } else {
        dispatch(setEditStatus(null));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setEditStatus(statuses.ERROR));
    }
  };
}
export function fetchSingleBlog(id) {
  // console.log(id);
  return async function fetchSingleBlogThunk(dispatch) {
    dispatch(setStatus(statuses.LOADING));
    try {
      const response = await API.get(`blog/${id}`);

      if (response.status === 200) {
        // console.log("Setting token:", response.data.token);
        dispatch(setBlog(response.data.data));
        dispatch(setStatus(statuses.SUCCESS));
      } else {
        dispatch(setStatus(statuses.ERROR));
      }
    } catch (error) {
      // console.log(error);
      dispatch(setStatus(statuses.ERROR));
    }
  };
}
