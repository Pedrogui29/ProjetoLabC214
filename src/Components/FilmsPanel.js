import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FilmsPanel() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=6f2b017864695e6859d3e73fb6d3dba3&language=en-US&page=1`;
    const promisse = axios.get(url);

    promisse
      .then((res) => {
        setFilms(res.data.results); // 'results' contém a lista de filmes
      })
      .catch((err) => {
        console.log(err.response.data);
        setError(true);
      });
  }, []);

  if (error) {
    return <div>Error loading films...</div>;
  }

  if (!films.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="films-container">
      <h1>Now Playing</h1>
      <div className="films-grid">
        {films.map((film) => (
          <Film key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}

function Film({ film }) {
    const navigate = useNavigate(); // Use o hook useNavigate para navegação

    const handleClick = () => {
        navigate(`/sessions/${film.id}`, { state: { title: film.title } });
    };

    const posterUrl = `https://image.tmdb.org/t/p/w500${film.poster_path}`;
    return (
        <div className="film" onClick={handleClick}>
            <img src={posterUrl} alt={film.title} />
            <p>{film.title}</p>
        </div>
    );
}