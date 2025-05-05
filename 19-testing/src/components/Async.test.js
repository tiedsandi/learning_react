import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

import Async from "./Async";

describe("Async Compnents", () => {
  test("renders posts if request succes", async () => {
    render(<Async />);

    const liElements = await screen.findAllByRole("listitem");
    expect(liElements).not.toHaveLength(0);
  });
});
