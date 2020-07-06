import React from "react";
import TechList from "./TechList";

import { render, fireEvent } from "@testing-library/react-native";

describe("TechList", () => {
  it("add new tech", () => {
    const { getByText, getByTestId } = render(<TechList />);

    console.log(getByText("Adicionar"));

    // fireEvent.changeText(getByTestId("tech-input"), "Node.js");
    // fireEvent.press(getByText("Adicionar"));

    // expect(getByText("Node.js")).toBeTruthy();
  });
});
