import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Seat from "../components/Seat";
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
});
