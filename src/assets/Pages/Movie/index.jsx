import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovie } from "../../../api/movieRequest";

function Movie() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movie.movie);

  useEffect(() => {
    try {
      getMovie(dispatch, id);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, id]);

  return (
    <div>
      {/* Slide */}
      <section>
        <div className="relative w-full lg:h-[600px] bg-black flex items-center justify-center">
          {movie?.trailerUrl ? (
            <iframe
              className="
              lg:w-[1500px] lg:h-full"
              src={`https://www.youtube.com/embed/${movie.trailerUrl}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <p className="text-white">Chưa có trailer</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Movie;
