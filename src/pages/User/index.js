import React, { Component } from 'react';

import { ActivityIndicator, View, StyleSheet } from 'react-native';

import PropTypes from 'prop-types';

import { PanResponder } from 'react-native';

import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Stars,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';

import api from '../../services/api';

const perPage = 20;

export default class User extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('user').name,
    });

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    };

    state = {
        page: 1,
        loading: false,
        stars: [],
        screenLoading: true,
        refreshing: false,
        setRefreshing: false,

    };

    async componentDidMount() {
        const { navigation } = this.props;
        const { page } = this.state;
        const user = navigation.getParam('user');

        const response = await api.get(`/users/${user.login}/starred?per_page=${perPage}&page=${this.state.page}`);


        this.setState({
            stars: response.data, screenLoading: false, page: page + 1,
        });
    }


    loadRepositories = async (shouldRefresh = false) => {
        if (this.state.loading) return;

        const { navigation } = this.props;

        const user = navigation.getParam('user');

        const { page } = this.state;

        this.setState({ loading: true });

        const response = await api.get(`/users/${user.login}/starred`);

        this.setState({
            stars: (shouldRefresh ? response.data : [...this.state.stars, ...response.data]),
            page: page + 1,
            loading: false,
        });
    };

    refreshList = () => {
        this.setState({ setRefreshing: true });

        this.loadRepositories(this.state.setRefreshing);

        this.setState({ setRefreshing: false });
    }

    renderFooter = () => {
        if (!this.state.loading) return null;
        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        );
    };

    render() {
        const { navigation } = this.props;

        const { stars, screenLoading } = this.state;

        const user = navigation.getParam('user');



        return (

            <Container>
                {screenLoading ? (
                    <ActivityIndicator size="large" color="gray" />
                ) : (
                        <View style={{ padding: 30 }}>
                            <Header>
                                <Avatar source={{ uri: user.avatar }} />
                                <Name>{user.name}</Name>
                                <Bio>{user.bio}</Bio>
                            </Header>
                            <Stars
                                onEndReached={this.loadRepositories}
                                onEndReachedThreshold={0.2}
                                onRefresh={this.refreshList}
                                refreshing={this.state.refreshing}
                                ListFooterComponent={this.renderFooter}
                                data={stars}
                                keyExtractor={(star) => String(star.id)}
                                renderItem={({ item }) => (
                                    <Starred>
                                        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                                        <Info>
                                            <Title>{item.name}</Title>
                                            <Author>{item.owner.login}</Author>
                                        </Info>

                                    </Starred>
                                )}
                            />
                        </View>
                    )}
            </Container>
        );
    };
};

const styles = StyleSheet.create({
    loading: {
        alignSelf: 'center',
        marginVertical: 20,
    },
});
