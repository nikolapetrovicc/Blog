import { render, screen } from "@testing-library/react";
import React from "react";

import { App } from "./App";

describe("<App>", () => {
  it("renders the page title", async () => {
    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "NaviPartner Tech Test" }),
    ).toBeInTheDocument();
  });
});
