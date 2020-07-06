import React, { Component } from "react";
import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    tech: "",
    techs: [],
  };

  componentDidMount() {
    console.log("executado assim que o componente aparece em tela");
    const techs = localStorage.getItem("techs");
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
  }

  componentDidUpdate(_, prevState) {
    console.log(
      "executado sempre que houver uma alteração nas props ou no estado",
      prevState
    );

    if (prevState.techs !== this.state.techs) {
      localStorage.setItem("techs", JSON.stringify(this.state.techs));
    }
  }

  componentWillMount() {
    console.log("executado quando o componente deixa de existir");
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // o estado recebera tudo que já tem mais o novo item
    this.setState({ techs: [...this.state.techs, this.state.tech], tech: "" });
  };

  handleRemove = (tech) => {
    this.setState({ techs: this.state.techs.filter((t) => t !== tech) });
  };

  render() {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="tech"
            onChange={this.handleChange}
            value={this.state.tech}
          />
          <button type="submit">Adicionar</button>
        </form>
        <ul>
          {this.state.techs.map((tech) => (
            <TechItem
              key={tech}
              tech={tech}
              handleRemove={() => this.handleRemove(tech)}
            />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default TechList;
