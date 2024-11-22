import styled from "styled-components";
import selecionado from "../assets/img/selecionado.png";
import disponivel from "../assets/img/disponivel.png";
import indisponivel from "../assets/img/indisponivel.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Seat from "./Seat";

export default function Seats() {
    const { sessionId } = useParams();
    const location = useLocation(); // Usando useLocation para acessar o estado passado
    const [places, setPlaces] = useState([]);
    const [nameSeat, setNameSeat] = useState([]);
    const [nameClient, setNameClient] = useState("");
    const [cpf, setCpf] = useState("");
    const title = location.state?.title || "Filme Exemplo"; // Título do filme do estado
    const day = location.state?.day || "01/01/2024"; // Data da sessão do estado
    const time = location.state?.time || "15:30"; // Hora da sessão do estado
    const navigate = useNavigate();

    // Função para gerar assentos aleatórios
    const generateSeats = (numSeats) => {
        const generatedSeats = [];
        for (let i = 0; i < numSeats; i++) {
            generatedSeats.push({
                id: i + 1,
                name: `Assento ${i + 1}`,
                isAvailable: Math.random() > 0.3 // 70% de chance de estar disponível
            });
        }
        return generatedSeats;
    };

    const [seats, setSeats] = useState(generateSeats(30)); // Gerar 30 assentos aleatórios

    function SubmitForm(e) {
        e.preventDefault();

        const body = {
            ids: places,
            name: nameClient,
            cpf
        };

        console.log(body);

        // Aqui você pode implementar a lógica de reserva, se necessário.
        navigate("/sucess", { state: { nameClient, cpf, title, time, day, nameSeat } });
    }

    return (
        <>
            <SelectSeat>
                <p>Selecione o(s) assentos</p>
            </SelectSeat>
            <ContainerSeat>
                {
                    seats.map((s) => 
                        <Seat 
                            key={s.id} 
                            name={s.name} 
                            free={s.isAvailable} 
                            places={places} 
                            SetPlaces={setPlaces} 
                            id={s.id} 
                            nameSeat={nameSeat} 
                            SetNameseat={setNameSeat}
                        />
                    )
                }
            </ContainerSeat>
            <StatusSeat>
                <div>
                    <img src={selecionado} alt="Selecionado" />
                    <p>Selecionado</p>
                </div>
                <div>
                    <img src={disponivel} alt="Disponível" />
                    <p>Disponível</p>
                </div>
                <div>
                    <img src={indisponivel} alt="Indisponível" />
                    <p>Indisponível</p>
                </div>
            </StatusSeat>
            <InfostoBuy>
                <form onSubmit={SubmitForm}>
                    <label htmlFor="Name">Nome</label>
                    <br />
                    <input 
                        type="text" 
                        onChange={(e) => setNameClient(e.target.value)}
                        value={nameClient}
                        required
                    />
                    <br />
                    <label htmlFor="Cpf">Cpf</label>
                    <br />
                    <input 
                        type="text" 
                        onChange={(e) => setCpf(e.target.value)}
                        value={cpf}
                        required    
                    />
                    <br />
                    <button>Reservar assento</button>
                </form>
            </InfostoBuy>
            <Footer>
                <img src="path/to/movie/poster" alt="Poster do filme" />
                <div>
                    <p>{title}</p>
                    <p>{day} - {time}</p>
                </div>
            </Footer>
        </>
    )
}

const SelectSeat = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;

    p {
        font-size: 24px;
        font-weight: bold;
        color: #E8833A;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    }
`;

const ContainerSeat = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 0 auto;
    max-width: 400px; /* Limita a largura máxima para manter o layout */
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatusSeat = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 20px auto;
    padding: 10px;
    max-width: 400px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    img {
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
        transition: transform 0.3s ease;
    }

    img:hover {
        transform: scale(1.2);
    }

    p {
        font-size: 14px;
        color: #333;
    }
`;

const InfostoBuy = styled.div`
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    font-size: 18px;

    label {
        font-weight: bold;
        display: block;
        margin: 10px 0 5px;
    }

    input {
        width: 100%;
        height: 45px;
        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #AFAFAF;
        border-radius: 5px;
        font-size: 16px;
    }

    button {
        width: 100%;
        height: 45px;
        color: white;
        background-color: #E8833A;
        border: none;
        border-radius: 5px;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease, transform 0.2s ease;

        &:hover {
            background-color: #d67930;
            transform: scale(1.05);
        }
    }
`;

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #DFE6ED;
    box-shadow: 0px -2px 6px rgba(0, 0, 0, 0.1);

    img {        
        width: 50px;
        height: 75px;
        margin-right: 18px;
        border-radius: 5px;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    }

    div {
        text-align: left;

        p {
            font-size: 16px;
            margin: 0;
            color: #333;
        }

        p:first-child {
            font-weight: bold;
        }
    }
`;