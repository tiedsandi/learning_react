import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async Compnents", () => {
  test("renders posts if request succes", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: "p1",
          title: "First post",
        },
      ],
    });

    render(<Async />);

    const liElements = await screen.findAllByRole("listitem");
    expect(liElements).not.toHaveLength(0);
  });
});
