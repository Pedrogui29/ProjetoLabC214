import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Seat from "../Components/Seat";
import '@testing-library/jest-dom';

describe("Seat Component", () => {
  const mockSetPlaces = jest.fn();
  const mockSetNameseat = jest.fn();
  const seatProps = {
    name: "1A",
    free: true,
    places: [],
    SetPlaces: mockSetPlaces,
    id: 1,
    nameSeat: [],
    SetNameseat: mockSetNameseat,
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa os mocks antes de cada teste
  });

  it("renders a free seat with the correct name", () => {
    render(<Seat {...seatProps} />);
    const seatButton = screen.getByText("1A");
    expect(seatButton).toBeInTheDocument();
    expect(seatButton.closest("button")).toHaveStyle("background-color: #7B8B99"); // Default color for free, unselected seat
  });

  it("changes seat to selected state when clicked", () => {
    render(<Seat {...seatProps} />);
    const seatButton = screen.getByText("1A");

  
    fireEvent.click(seatButton);


    expect(mockSetPlaces).toHaveBeenCalledWith([1]); // Adds the ID
    expect(mockSetNameseat).toHaveBeenCalledWith(["1A"]); // Adds the seat name
    expect(seatButton.closest("button")).toHaveStyle("background-color: #0E7D71"); // Selected color
  });

  it("removes seat from selected state when clicked again", () => {
    const selectedProps = {
      ...seatProps,
      places: [1],
      nameSeat: ["1A"],
    };

    render(<Seat {...selectedProps} />);
    const seatButton = screen.getByText("1A");

   
    fireEvent.click(seatButton); 
    fireEvent.click(seatButton); 

   
    expect(mockSetPlaces).toHaveBeenCalledWith([]); 
    expect(mockSetNameseat).toHaveBeenCalledWith([]); 
    expect(seatButton.closest("button")).toHaveStyle("background-color: #7B8B99"); 
  });

  it("renders a non-free seat and shows an alert when clicked", () => {
    const nonFreeProps = { ...seatProps, free: false };

  
    const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Seat {...nonFreeProps} />);
    const seatButton = screen.getByText("1A");

   
    fireEvent.click(seatButton);

    
    expect(mockAlert).toHaveBeenCalledWith("Este assento não está disponível.");

    
    expect(seatButton.closest("button")).toHaveStyle("background-color: #F7C52B");

    
    mockAlert.mockRestore();
  });

  it("handles `places` and `nameSeat` when other seats are already selected", () => {
    const multipleProps = {
      ...seatProps,
      places: [2],
      nameSeat: ["2B"],
    };
  
    render(<Seat {...multipleProps} />);
    const seatButton = screen.getByText("1A");
  
    fireEvent.click(seatButton);
  
    expect(mockSetPlaces).toHaveBeenCalledWith([2, 1]);
    expect(mockSetNameseat).toHaveBeenCalledWith(["2B", "1A"]);
  });

  it("renders multiple seats correctly when others are selected", () => {
    const props = {
      ...seatProps,
      places: [2, 3],
      nameSeat: ["2B", "3C"],
    };

    render(<Seat {...props} />);
    const seatButton = screen.getByText("1A");

    fireEvent.click(seatButton);

    expect(mockSetPlaces).toHaveBeenCalledWith([2, 3, 1]);
    expect(mockSetNameseat).toHaveBeenCalledWith(["2B", "3C", "1A"]);
  });

  it("updates style correctly for a seat that toggles state", () => {
    render(<Seat {...seatProps} />);
    const seatButton = screen.getByText("1A");

    // Seleciona
    fireEvent.click(seatButton);
    expect(seatButton.closest("button")).toHaveStyle("background-color: #0E7D71");

    // Remove seleção
    fireEvent.click(seatButton);
    expect(seatButton.closest("button")).toHaveStyle("background-color: #7B8B99");
  });

  it("does not allow removing a seat that is not selected", () => {
    render(<Seat {...seatProps} />);
    const seatButton = screen.getByText("1A");

    fireEvent.click(seatButton); // Seleciona
    fireEvent.click(seatButton); // Remove
    fireEvent.click(seatButton); // Tenta selecionar de novo

    // Valida estado final após as ações
    expect(mockSetPlaces).toHaveBeenLastCalledWith([1]);
    expect(mockSetNameseat).toHaveBeenLastCalledWith(["1A"]);
  });

  it("handles `free` state change dynamically", () => {
    const { rerender } = render(<Seat {...seatProps} />);
    const seatButton = screen.getByText("1A");

    // Verifica o estilo inicial
    expect(seatButton.closest("button")).toHaveStyle("background-color: #7B8B99");

    // Atualiza o estado para `free: false` e verifica o estilo atualizado
    rerender(<Seat {...seatProps} free={false} />);
    const updatedButton = screen.getByText("1A"); // Reobtém o botão renderizado

    expect(updatedButton.closest("button")).toHaveStyle("background-color: #F7C52B");
  });

});
