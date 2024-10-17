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
const ContainerSeat = styled.div`
    margin-left: 24px;
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;    
`;
const StatusSeat = styled.div`
    display: flex;
    justify-content: space-around;
    div {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    img {
        width: 25px;
        height: 25px;
        margin-bottom: 5px;
    }
`;
const InfostoBuy = styled.div`
    width: 100%;
    margin-left: 24px;
    margin-top: 41px;
    margin-bottom: 200px;
    font-size: 18px;
    input {
        width: 327px;
        height: 45px;
        margin: 15px;
        border: 1px solid #AFAFAF;
    }
    button {
        width: 225px;
        height: 42px;
        color: white;
        background-color: #E8833A;
        border: none;
        margin-left: 70px;
        margin-top: 15px;
        font-size: 18px;
    }
`;
const Footer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
    background-color: #DFE6ED;
    img {        
        width: 48px;
        height: 72px;
        margin-right: 18px;
        margin-left: 18px;
    }
    p {
        margin-bottom: 8px;
    }
`;