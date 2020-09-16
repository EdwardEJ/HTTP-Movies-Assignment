import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const initialFormValues = {
  title: "",
  director: "",
  metascore: 0,
  stars: [],
};

const UpdateMovie = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { push } = useHistory();
  const { id } = useParams();

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const inputHandler = (e) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    Axios.put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        const newMovieList = props.movieList.filter(
          (movie) => movie.id !== res.data.id
        );
        props.setMovieList(newMovieList);
        setFormValues(initialFormValues);
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { title, director, metascore, stars } = formValues;
  return (
    <>
      <form onSubmit={submitHandler}>
        <input type="text" name="title" value={title} onChange={inputHandler} />
        <input
          type="text"
          name="director"
          value={director}
          onChange={inputHandler}
        />
        <input
          type="text"
          name="metascore"
          value={metascore}
          onChange={inputHandler}
        />
        <input type="text" name="stars" value={stars} onChange={inputHandler} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default UpdateMovie;
