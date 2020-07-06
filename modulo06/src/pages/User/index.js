import React, { Component } from "react";
import PropTypes from "prop-types";
import api from "../../services/api";
import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  List,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from "./styles";

class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("user").name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const response = await api.get(`/users/${user.login}/starred`);
    this.setState({ stars: response.data });
  }

  render() {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam("user");

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar_url }}></Avatar>
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <List
          data={stars}
          keyExtractor={(star) => String(star.id)}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar
                source={{ uri: item.owner.avatar_url }}
              ></OwnerAvatar>
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}

export default User;