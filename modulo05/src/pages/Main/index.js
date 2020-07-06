import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import Container from "../../components/Container";
import { Form, SubmitButton, List } from "./styles";

class Main extends Component {
  state = {
    repository: "",
    repositories: [],
    loading: false,
  };

  componentDidMount() {
    const repositories = localStorage.getItem("repositories");
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }

  handleChange = (e) => {
    this.setState({ repository: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ loading: true });
    const { repository, repositories } = this.state;
    const response = await api.get(`/repos/${repository}`);
    const { full_name: name } = response.data;
    const data = { name };

    this.setState({
      repositories: [...repositories, data],
      repository: "",
      loading: false,
    });
  };

  render() {
    const { repository, repositories, loading } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt /> Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={repository}
            onChange={this.handleChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repositories.map((respository) => (
            <li key={respository.name}>
              <span>{respository.name}</span>
              <Link to={`/repository/${encodeURIComponent(respository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

export default Main;
