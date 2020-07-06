import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import Container from "../../components/Container";
import { Loaging, Owner, IssueList } from "./styles";

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }),
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const name = decodeURIComponent(match.params.repository);

    // o retorno será um array com 2 elementos, 0 e 1, desta forma
    // desestruturamos assim, dando alias a eles, 0 = repo, e 1 eh issues
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${name}`),
      api.get(`/repos/${name}/issues`, {
        params: {
          state: "open",
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return (
        <Loaging>
          <FaSpinner /> Carregado...
        </Loaging>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="">Voltar aos repositórios</Link>
          <img
            src={repository.owner.avatar_url}
            alt={repository.owner.login}
            title={repository.owner.login}
          />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          {issues.map((issue) => (
            <li key={String(issue.id)}>
              <img
                src={issue.user.avatar_url}
                alt={issue.user.login}
                title={issue.user.login}
              />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map((label) => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}

export default Repository;
