import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "jest-localstorage-mock";
import App from "./App";

describe("App component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("verifica se adicionou uma nota tecnologia atraves do click do botao", () => {
    const { getByText, getByTestId, debug } = render(<App />);
    fireEvent.click(getByText("Adicionar"));
    debug();
    expect(getByTestId("tech-list")).not.toContainElement(getByText("Node.js"));
  });

  // it("verifica se adicionou uma nota tecnologia atraves do formulario", () => {
  //   const { getByText, getByTestId, getByLabelText } = render(<TechList />);
  //   fireEvent.change(getByLabelText("Tech"), { target: { value: "Node.js" } });
  //   fireEvent.submit(getByTestId("tech-form"));
  //   expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
  //   expect(getByLabelText("Tech")).toHaveValue("");
  // });
  // it("verifica se gravou as tecnologias em localstorage", () => {
  //   let { getByText, getByTestId, getByLabelText } = render(<TechList />);
  //   fireEvent.change(getByLabelText("Tech"), { target: { value: "Node.js" } });
  //   fireEvent.submit(getByTestId("tech-form"));
  //   cleanup();
  //   ({ getByText, getByTestId, getByLabelText } = render(<TechList />));
  //   expect(localStorage.setItem).toHaveBeenCalledWith(
  //     "techs",
  //     JSON.stringify(["Node.js"])
  //   );
  //   expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
  // });
});
