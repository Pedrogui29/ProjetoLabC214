import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Sessions() {
    const { filmId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const filmTitle = location.state?.title || "Filme não encontrado";

    // Lista de sessões
    const showtimes = [
        { id: 1, time: "15:30", type: "Dublado" },
        { id: 2, time: "16:30", type: "Legendado" },
        { id: 3, time: "19:00", type: "Dublado" },
        { id: 4, time: "21:30", type: "Legendado" },
    ];

    // Função para clicar no card da sessão
    const handleSessionClick = (sessionId) => {
        const selectedSession = showtimes.find((session) => session.id === sessionId);
        navigate(`/seats/${sessionId}`, {
            state: {
                title: filmTitle,
                day: "01/01/2024",
                time: selectedSession.time,
            },
        });
    };

    return (
        <Container>
            <SelectTime>
                <p>Selecione um horário para o filme: <strong>{filmTitle}</strong></p>
            </SelectTime>
            <ShowtimeContainer>
                {showtimes.map((showtime) => (
                    <ShowtimeCard key={showtime.id} onClick={() => handleSessionClick(showtime.id)}>
                        <Time>{showtime.time}</Time>
                        <Type>{showtime.type}</Type>
                    </ShowtimeCard>
                ))}
            </ShowtimeContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw; /* Garante que o container ocupe toda a largura da tela */
    height: 100vh; /* Garante que o container ocupe toda a altura da tela */
    margin: 0; /* Remove qualquer margem */
    padding: 0; /* Remove qualquer padding */
    display: flex;
    flex-direction: column;
    justify-content: center; /* Centraliza os elementos verticalmente */
    align-items: center; /* Centraliza os elementos horizontalmente */
    box-sizing: border-box; /* Garante que largura e altura incluem padding e bordas */
`;

const SelectTime = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 40px; /* Espaço entre a frase e os cards */

    p {
        font-size: 1.2rem;
        font-weight: 500;
        color: #333;
    }

    strong {
        color: #E8833A;
    }
`;

const ShowtimeContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centraliza os cards horizontalmente */
    align-items: center; /* Centraliza os cards verticalmente */
    gap: 20px;
    width: 100%; /* Garante que os elementos possam ser centralizados */
    max-width: 600px; /* Limita a largura para não se expandir muito */
`;

const ShowtimeCard = styled.div`
    width: 200px;
    height: 100px;
    background-color: #E8833A;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: white;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        background-color: #d67930;
    }
`;

const Time = styled.p`
    font-size: 1.5rem;
    margin: 0;
`;

const Type = styled.p`
    font-size: 1rem;
    margin: 0;
    opacity: 0.8;
`;