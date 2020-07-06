import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
//import "jest-localstorage-mock";

import TechList from "./index";
import { addTech } from "../../store/modules/techs/actions";

jest.mock("react-redux");

describe("Techlist component", () => {
  // beforeEach(() => {
  //   localStorage.clear();
  // });
  // it("verifica se adicionou uma nota tecnologia atraves do click do botao", () => {
  //   const { getByText, getByTestId } = render(<TechList />);
  //   fireEvent.click(getByText("Adicionar"));
  //   expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
  // });
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

  it("se renderiza as tecnologias useSeletor", () => {
    useSelector.mockImplementation((callback) =>
      callback({ techs: ["Node.js", "ReactJS"] })
    );

    const { getByText, getByTestId, debug } = render(<TechList />);

    //debug();

    expect(getByTestId("tech-list")).toContainElement(getByText("Node.js"));
    expect(getByTestId("tech-list")).toContainElement(getByText("ReactJS"));
  });

  it("testar se adiciona nova tecnologia, se a action disparou useDispatch", () => {
    let { getByTestId, getByLabelText, debug } = render(<TechList />);

    const dispatch = jest.fn();

    useDispatch.mockReturnValue(dispatch);

    fireEvent.change(getByLabelText("Tech"), { target: { value: "Node.js" } });
    fireEvent.submit(getByTestId("tech-form"));

    //debug();

    //console.log(dispatch.mock.calls);

    expect(dispatch).toHaveBeenCalledWith(addTech("Node.js"));
  });
});
