import { useLocation, useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function Sessions() {
    const { filmId } = useParams();
    const location = useLocation();
    const navigate = useNavigate(); // Adicionado para navegação
    const filmTitle = location.state?.title || "Filme não encontrado";

    // Defina uma lista de sessões como exemplo
    const showtimes = [
        { id: 1, time: "15:30", type: "Dublado" },
        { id: 2, time: "16:30", type: "Legendado" },
        { id: 3, time: "19:00", type: "Dublado" },
        { id: 4, time: "21:30", type: "Legendado" },
    ];

    // Função para lidar com o clique no card da sessão
    const handleSessionClick = (sessionId) => {
        const selectedSession = showtimes.find((session) => session.id === sessionId); // Encontre a sessão selecionada
        navigate(`/seats/${sessionId}`, {
            state: {
                title: filmTitle, // Título do filme
                day: "01/01/2024", // Data da sessão (substitua pela data real se disponível)
                time: selectedSession.time // Hora da sessão
            }
        }); // Redireciona para a página de seleção de assentos
    };

    return (
        <Container>
            <SelectTime>
                <p>Selecione um horário para o filme: {filmTitle}</p>
            </SelectTime>
            <ShowtimeContainer>
                {showtimes.map((showtime) => (
                    <ShowtimeCard key={showtime.id} onClick={() => handleSessionClick(showtime.id)}>
                        <p>{showtime.time}</p>
                        <p>{showtime.type}</p>
                    </ShowtimeCard>
                ))}
            </ShowtimeContainer>
        </Container>
    );
}

const Container = styled.div`
    width: 375px;
    margin-bottom: 125px;
`;

const SelectTime = styled.div`
    width: 374px;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 67px;
    p {
        font-size: 24px;
    }
`;

const ShowtimeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const ShowtimeCard = styled.div`
    width: 90%;
    background-color: #E8833A;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    text-align: center;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #d67930;
    }
`;