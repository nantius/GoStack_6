import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  Author,
  Info,
  Title,
  OwnerAvatar,
} from './styles';

export default class User extends React.Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    this.loadStarred();
  }

  loadStarred = async () => {
    const { route } = this.props;
    const { user } = route.params;
    const { page, stars, loading } = this.state;
    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${page}`
      );
      this.setState({
        stars: [...stars, ...response.data],
        page: page + 1,
        loading: false,
      });
    } catch (e) {
      console.tron.log(e);
    }
  };

  refreshList = async () => {
    this.setState({
      loading: true,
      stars: [],
      page: 1,
    });

    this.loadStarred();
  };

  handlePagePreview = url => {
    const { navigation } = this.props;
    navigation.navigate('Preview', { url });
  };

  render() {
    const { stars, loading } = this.state;
    const { route } = this.props;
    const { user } = route.params;

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator color="#7159c1" size={50} />
        ) : (
          <Stars
            data={stars}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadStarred}
            onRefresh={this.refreshList}
            refreshing={this.state.loading}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <RectButton onPress={() => this.handlePagePreview(item.html_url)}>
                <Starred>
                  <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                  <Info>
                    <Title>{item.name}</Title>
                    <Author>{item.owner.login}</Author>
                  </Info>
                </Starred>
              </RectButton>
            )}
          />
        )}
      </Container>
    );
  }
}
