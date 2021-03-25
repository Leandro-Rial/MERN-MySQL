import React, { useState, useEffect } from "react";
import axios from "axios";
import "./app.css";

function App() {
  const [movieName, setMovieName] = useState("");
  const [review, setReview] = useState("");
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/get").then((response) => {
      setMovieList(response.data);
    });
  }, []);

  const submitReview = () => {
    axios.post("http://localhost:5000/api/insert", {
      movieName: movieName,
      movieReview: review,
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review },
    ]);
  };

  const deleteReview = (movie) => {
    axios.delete(`http://localhost:5000/api/delete/${movie}`);
  };

  const updateReview = async (movie) => {
    await axios.put("http://localhost:5000/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  };

  return (
    <div className="App">
      <h1 className="crud-titulo">CRUD APPLICATION</h1>

      <div className="form">
        <form onSubmit={submitReview}>
          <label>Movie Name:</label>
          <input
            type="text"
            name="movieName"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
          <label>Review:</label>
          <input
            type="text"
            name="review"
            onChange={(e) => {
              setReview(e.target.value);
            }}
          />

          <button className="submit">Submit</button>
        </form>

        <div className="movies">
          {movieReviewList.map((mov, index) => {
            return (
              <div key={index} className="card">
                <div className="card-content">
                  <h1>Movie Name: {mov.movieName}</h1>
                  <p>Movie Review: {mov.movieReview}</p>

                  <button
                    onClick={() => {
                      deleteReview(mov.movieName);
                    }}
                  >
                    Delete
                  </button>
                  <input
                    type="text"
                    id="updateInput"
                    onChange={(e) => {
                      setNewReview(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateReview(mov.movieName);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
