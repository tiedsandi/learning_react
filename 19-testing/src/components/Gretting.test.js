import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Greeting from "./Greeting";

describe("Greeting Compnents", () => {
  test("renders Hello World as a text", () => {
    // Arrage
    render(<Greeting />);

    // Act
    // Nothing...

    // Assert
    const helloWorldElement = screen.getByText("Hello World!");
    expect(helloWorldElement).toBeInTheDocument();
  });

  test("renders good to see you if the button was NOT clicked", () => {
    render(<Greeting />);

    const outPutelement = screen.getByText("good to see you", { exact: false });
    expect(outPutelement).toBeInTheDocument();
  });

  test("renders 'Change!' if the button was clicked", () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outPutelement = screen.getByText("Changed!");
    expect(outPutelement).toBeInTheDocument();
  });

  test('does not render "It \' s good to see you" if the butotn not on click', () => {
    render(<Greeting />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outPutelement = screen.queryByText("It's good to see you", {
      exact: false,
    });
    expect(outPutelement).not.toBeInTheDocument();
  });
});
