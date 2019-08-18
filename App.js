import React from 'react';
import {View, ActivityIndicator, FlatList, Text } from 'react-native';

import ArticleItem from './components/ArticleItem';
import ArticlesCount from './components/ArticlesCount';
import Styles from './Styles'
import {filterForUniqueArticles} from './utils/index'

export default class App extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      loading: true,
      articles: [],
      pageNumber: 1,
      hasErrored: false,
      lastPageReached: false,
    };
  };

  getNews = async () => {
    if(this.state.lastPageReached)
      return;

    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=efb832eb3811412da083d56f13800175&page=${this.state.pageNumber}`
      );
      const jsonData = await response.json();
      const hasMoreArticles = jsonData.articles.length > 0;
      if(hasMoreArticles) {
        const newArticleList = filterForUniqueArticles(this.state.articles.concat(jsonData.articles));
        this.setState({
          articles: newArticleList,
          pageNumber: this.state.pageNumber + 1,
        });
      } else {
        this.setState({
          lastPageReached: true,
        });
      };
    } catch(error) {
      this.setState({
        hasErrored: true,
      });
    }
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    this.getNews();
  };

  onRefresh = async () => {
    await this.setState({
      pageNumber: 1,
      articles: [],
      lastPageReached: false,
    });
    await this.getNews();
  };

  render(){
    if (this.state.loading) {
      return (
        <View style={Styles.container}>
          <ActivityIndicator size='large' loading={this.state.loading} color='blue'/>
        </View>
      );
    };

    if(this.state.hasErrored){
      return (
        <View style={Styles.container}>
          <Text>Error=(</Text>
        </View>
      );
    };

    return (
      <View style={Styles.container}>
        <ArticlesCount count={this.state.articles.length} />
        <FlatList
          data={this.state.articles}
          renderItem={({item}) => ArticleItem(item)}
          keyExtractor={item => item.title}
          onEndReached={this.getNews}
          onEndReachedThreshold={1}
          ListFooterComponent={
            this.state.lastPageReached ? 
            <View style={{alignItems: 'center'}}><Text>No more articles</Text></View> : 
            <ActivityIndicator size='large' loading={this.state.loading} color='blue' />}
          onRefresh={this.onRefresh}
          refreshing={false}
        />
      </View>
    );
  };
}