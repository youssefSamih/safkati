import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StarRating from 'react-native-star-rating';

import { 
	Container, 
	Header, 
	Content, 
	List, 
	ListItem, 
	Thumbnail, 
	Text, 
	H2, 
	Left, 
	Body, 
	Right, 
	Icon, 
	Grid,
	Title,
	Button,
	Separator
} from 'native-base';

import {Block, Divider} from '../components';
import { theme, params } from '../constants';
import i18n from '../i18n/i18n';

import { connect } from 'react-redux';
import { getUserInfo,signOut } from '../redux/actions';

class MonEspace extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: "Espace perso",
	    drawerLabel: 'Espace perso',
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });

	componentWillMount(){
		const {id} = this.props.user;
		this.props.getUserInfo({id});
	}

	constructor(props) {
	    super(props);
	    this.state = {
	      starCount: 2.5
	    };
	}

	render(){
		return( 
			<Container>
				<Header noRight>
		          <Left>
		            <Button transparent onPress={() =>  this.props.navigation.openDrawer()}>
		              <Icon name="menu" />
		            </Button>
		          </Left>
		          <Body>
		            <Title>{i18n.t('Espace pro title')}</Title>
		          </Body>
		        </Header>
		        <Content>
		        	<Block center padding={18}>
			       	<Thumbnail
			       	  large
			       	  style={styles.logoImg}
			          source={params.app.FACE} />
				      <H2>{this.props.user.nom}</H2>
			          <StarRating
				        disabled={true}
				        emptyStar={'ios-star-outline'}
				        fullStar={'ios-star'}
				        halfStar={'ios-star-half'}
				        iconSet={'Ionicons'}
				        maxStars={5}
				        rating={this.state.starCount}
				        //selectedStar={(rating) => this.onStarRatingPress(rating)}
				        fullStarColor={theme.colors.primary}
				      />
			       </Block>
			       <Separator bordered />
			      
		          <ListItem icon>
		            <Left>
		              <Button>
		                <Icon  name="person" />
		              </Button>
		            </Left>
		            <Body>
		              <Text>{i18n.t('My account')}</Text>
		            </Body>
		            <Right>
		              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		            </Right>
		          </ListItem>
		          <ListItem icon>
		            <Left>
		              <Button >
		                <Icon  name="mail" />
		              </Button>
		            </Left>
		            <Body>
		              <Text>{i18n.t('My voicemail')}</Text>
		            </Body>
		            <Right>
		              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		            </Right>
		          </ListItem>
		          <ListItem icon onPress={() =>  this.props.navigation.navigate('ClientsDeclare')}>
		            <Left>
		              <Button >
		                <Icon  name="bookmark" />
		              </Button>
		            </Left>
		            <Body>
		              <Text>{i18n.t('My clients declared')}</Text>
		            </Body>
		            <Right>
		              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		            </Right>
		          </ListItem>
		          <ListItem icon>
		            <Left>
		              <Button >
		                <Icon  name="notifications" />
		              </Button>
		            </Left>
		            <Body>
		              <Text>{i18n.t('My commissions')}</Text>
		            </Body>
		            <Right>
		              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		            </Right>
		          </ListItem>
		          <ListItem icon>
		            <Left>
		              <Button >
		                <Icon  name="bookmarks" />
		              </Button>
		            </Left>
		            <Body>
		              <Text>{i18n.t('My referrals')}</Text>
		            </Body>
		            <Right>
		              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		            </Right>
		          </ListItem>
		        </Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({

	logoImg:{
	    backgroundColor: '#eee',
	}

});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	clients: state.monespace.clients,
});

export default connect(mapStateToProps, {getUserInfo})(MonEspace) ;