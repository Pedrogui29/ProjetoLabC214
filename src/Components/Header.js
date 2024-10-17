import styled from "styled-components"

export default function Header(){
    return(
        <NameApp>
            <p>Engenharia de FIlme</p>
        </NameApp>
    )
}

const NameApp = styled.div`
    width: 100%;
    height: 67px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #C3CFD9;
    display: flex;
    justify-content: center;
    align-items: center;

    p{
        color: #E8833A; 
        font-size: 34px;
    }
`