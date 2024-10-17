import GlobalStyle from "../assets/css/GlobalStyle";
import styled from "styled-components";
import Header from "./Header";
import FilmsPanel from "./FilmsPanel";
import Seats from "./Seats";
import Sessions from "./Sessions";
import Sucess from "./Sucess";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <PageMain>
                <Header />
                <Routes>
                    <Route path="/" element={<FilmsPanel />} />
                    <Route path="/sessions/:filmId" element={<Sessions />} />
                    <Route path="/seats/:sessionId" element={<Seats />} />
                    <Route path="/sucess" element={<Sucess />} />
                </Routes>
            </PageMain>
        </BrowserRouter>
    )
}

const PageMain = styled.div`
    width: 375px;
    height: 100%;
    background-color: white;
`
