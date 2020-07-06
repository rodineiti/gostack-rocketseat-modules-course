import React, { Component } from "react";
import PropTypes from "prop-types";
import AsyncStorage from "@react-native-community/async-storage";
import { Keyboard, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import api from "../../services/api";
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from "./styles";

class Main extends Component {
  static navigationOptions = {
    title: "Usuários",
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    user: "",
    users: [],
    loading: false,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem("users");
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem("users", JSON.stringify(users));
    }
  }

  handleSubmit = async () => {
    const { user, users } = this.state;
    this.setState({ loading: true });
    const response = await api.get(`/users/${user}`);
    const { name, login, bio, avatar_url } = response.data;
    const data = {
      name,
      login,
      bio,
      avatar_url,
    };

    setTimeout(() => {
      this.setState({ users: [...users, data], user: "", loading: false });
    }, 3000);

    Keyboard.dismiss();
  };

  render() {
    const { user, users, loading } = this.state;
    const { navigation } = this.props;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            onChangeText={(text) => this.setState({ user: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
            value={user}
          />
          <SubmitButton onPress={this.handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#fff" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={(user) => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar_url }}></Avatar>
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton
                onPress={() => navigation.navigate("User", { user: item })}
              >
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

export default Main;
