import React from 'react'
import {Text, View, Linking } from 'react-native';

import moment from 'moment';
import {Card, Button, Icon} from 'react-native-elements';
import Styles from '../Styles'

export default ArticleItem = (article) => {
	const onPress = url => {
		Linking.canOpenURL(url).then(supported => {
			if (supported) {
				Linking.openURL(url);
			} else {
				console.log(`Don't know how to open URL: &{url}`);
			}
		});
	};

	return (
		<Card 
			title = {article.title} 
			image={{uri: article.urlToImage}}>
			<View style={Styles.row}>
				<Text style={Styles.label}>Source:</Text>
				<Text style={Styles.info}>{article.source.name}</Text>
			</View>
			<Text>{article.content}</Text>
			<View style={Styles.row}>
				<Text style={Styles.label}>Published:</Text>
				<Text style={Styles.info}>{moment(article.publishedAt).format('LLL')}</Text>
			</View>
			<Button icon={<Icon />} title="Read more" backgroundColor="#03A9F4" onPress={() => onPress(article.url)}/>
		</Card>
	);
};