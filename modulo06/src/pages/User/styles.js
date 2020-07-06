import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 30px;
`;

export const Header = styled.View`
  align-items: center;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #eee; /** enquanto a imagem não carrega, fica mostrando um fundo nesta cor, efeito bacana pra loading */
`;

export const Name = styled.Text`
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #999;
  line-height: 18px;
  margin-top: 5px;
  text-align: center;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false /** não mostra o scroll ao lado da lista */,
})`
  margin-top: 20px;
`;

export const Starred = styled.View`
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
`;

export const OwnerAvatar = styled.Image`
  width: 42;
  height: 42px;
  border-radius: 24px;
  background: #eee; /** enquanto a imagem não carrega, fica mostrando um fundo nesta cor, efeito bacana pra loading */
`;

export const Info = styled.View`
  margin-left: 10px;
  flex: 1;
`;

export const Title = styled.Text.attrs({
  numberOfLine: 1,
})`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

export const Author = styled.Text`
  font-size: 13px;
  color: #666;
  margin-top: 2px;
`;
