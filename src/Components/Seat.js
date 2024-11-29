import { useState } from "react"
import styled from "styled-components"
import React from 'react';


function selectseats(places, SetPlaces, id, selected, setSelect, nameSeat, SetNameseat, name){
    //tornar o select o inverso do q ele é
    
    //se select for true então adicionar o id ao array places
    if(!selected){
        setSelect(!selected)
        const newseat = [...places, Number(id)]
        SetPlaces(newseat)  
        const newnameseat = [...nameSeat, name]
        SetNameseat(newnameseat)      
    }else{
        setSelect(!selected)
        const newseat = places.filter( p => p !== id)
        SetPlaces(newseat)  
        const newnameseat = nameSeat.filter( n => n !== name)
        SetNameseat(newnameseat)  
    }
    //senão garantir que o id não esteja no array
}

export default function Seat({ name, free, places, SetPlaces, id, nameSeat, SetNameseat}) {
    const [selected, setSelect] = useState(false)

    return (
        <>
            {free ? (
                <Button selected = {selected}
                    onClick={
                        () => selectseats(places, SetPlaces, id, selected, setSelect, nameSeat, SetNameseat, name)                      
                    }>
                    <p>{name}</p>
                </Button>
            )
                : (
                    <ButtonNotfree
                        onClick={() => alert('Este assento não está disponível.')}>
                        <p>{name}</p>
                    </ButtonNotfree>
                )}
        </>
    )
}

const Button = styled.button`
    width: 26px;
    height: 26px;
    border-radius: 100%;
    margin: 8px;
    background-color: ${(prop)=> prop.selected? "#0E7D71" : "#7B8B99"};
`
const ButtonNotfree = styled.button`
    width: 26px;
    height: 26px;
    border-radius: 100%;
    margin: 8px;
    background-color: #F7C52B;
`

