import { useState, useEffect, useRef } from "react";
import imgDefault from '../assets/images/default.webp';

function SearchMovies() {
  const [movies, setMovies] = useState([]);
  const [keyword, setKeyword] = useState("bat");
  const input = useRef();
  // Credenciales de API
  const apiKey = "fe26460c"; // Intenta poner cualquier cosa antes para probar

  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${keyword}&type=movie`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search));
  }, [keyword]);

console.log(movies);

  const handleSubmit = (e) => {
    e.preventDefault();
	setKeyword(input.current.value)
  };

  return (
    <div className="container-fluid">
      {apiKey !== "" ? (
        <>
          <div className="row my-4">
            <div className="col-12 col-md-6">
              {/* Buscador */}
              <form method="GET" onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group">
                  <label htmlFor="">Buscar por título:</label>
                  <input type="text" className="form-control" name="keyword" ref={input}/>
                </div>
                <button className="btn btn-info">Search</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <h2>Películas para la palabra: {keyword}</h2>
            </div>
            {/* Listado de películas */}
            {
              movies.map((movie, i) => {
                return (

                  <div className="col-12 col-sm-6 col-md-3 my-4" key={i}>
                    <div className="card shadow mb-4" style={{height: "max-content"}}>
                      <div className="card-header py-2">
                        <h5 className="m-0 font-weight-bold text-gray-800">
                          {movie.Title}
                        </h5>
                      </div>
                      <div className="card-body">
                        <div className="text-center">
                          <img
                            className="img-fluid px-1 mt-2 mb-2"
                            src={movie.Poster === 'N/A' ?imgDefault:movie.Poster}
                            alt={movie.Title}
                            style={{
                              width: "90%",
                              height: "300px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <p>{movie.Year}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          {movies.length === 0 && (
            <div className="alert alert-warning text-center">
              No se encontraron películas
            </div>
          )}
        </>
      ) : (
        <div className="alert alert-danger text-center my-4 fs-2">
          Eyyyy... ¿PUSISTE TU APIKEY?
        </div>
      )}
    </div>
  );
}

export default SearchMovies;
