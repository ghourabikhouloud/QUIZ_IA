// Import necessary modules for testing
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import faker from "faker";
import App from "../App";
import ResultPage from "../components/ResultPage";

// Mock the useState hook
jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));

// Mock the handleReview function
const mockSetShowReview = jest.fn();
useState.mockImplementation((init) => [false, mockSetShowReview]);

describe("App Component", () => {
  it("renders ResultPage with correct props when showReview is false", () => {
    render(<App />);
    expect(ResultPage).toHaveBeenCalledWith(
      expect.objectContaining({
        score: 8,
        total: 10,
        onReview: expect.any(Function),
        canReview: true,
      })
    );
  });

  it("calls handleReview function and sets showReview to true when onReview is called", () => {
    const { getByTestId } = render(<App />);
    const button = getByTestId("review-button");
    fireEvent.click(button);
    expect(mockSetShowReview).toHaveBeenCalledWith(true);
  });
});