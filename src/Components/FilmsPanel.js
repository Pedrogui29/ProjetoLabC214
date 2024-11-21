import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function FilmsPanel() {
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=6f2b017864695e6859d3e73fb6d3dba3&language=en-US&page=1`;
    axios
      .get(url)
      .then((res) => {
        setFilms(res.data.results);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
      });
  }, []);

  if (error) {
    return <div style={styles.errorMessage}>Error loading films...</div>;
  }

  if (!films.length) {
    return <div style={styles.loadingMessage}>Loading films...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Now Playing</h1>
      <div style={styles.grid}>
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
}

function FilmCard({ film }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/sessions/${film.id}`, { state: { title: film.title } }); // Navega para a próxima tela com o ID do filme
  };

  const posterUrl = `https://image.tmdb.org/t/p/w200${film.poster_path}`; // Miniatura do pôster (w200)

  return (
    <div style={styles.card} onClick={handleClick}>
      <img src={posterUrl} alt={film.title} style={styles.poster} />
      <p style={styles.filmTitle}>{film.title}</p>
    </div>
  );
}
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    textAlign: "center",
    width: "100vw", // Ocupa toda a largura da tela
    minHeight: "100vh", // Ocupa toda a altura da tela
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "flex-start", // Cards no topo
  },
  title: {
    fontSize: "2rem",
    color: "#444",
    marginBottom: "20px",
  },
  grid: {
    display: "flex", // Flexbox para organizar os cards
    flexWrap: "wrap", // Permite quebra de linha em telas menores
    gap: "20px", // Espaço entre os cards
    justifyContent: "center", // Centraliza os cards horizontalmente
    width: "100%", // Garante que o grid ocupe toda a largura disponível
    maxWidth: "1200px", // Limita a largura em telas muito grandes
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease, boxShadow 0.2s ease",
    cursor: "pointer",
    width: "150px", // Largura fixa para os cards
    textAlign: "center",
    padding: "10px",
  },
  poster: {
    width: "100%",
    height: "auto",
    borderRadius: "4px",
    marginBottom: "8px",
  },
  filmTitle: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    color: "#333",
  },
  errorMessage: {
    color: "red",
    fontSize: "1.5rem",
  },
  loadingMessage: {
    color: "#555",
    fontSize: "1.5rem",
  },
};