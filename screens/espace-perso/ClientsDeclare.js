import React from 'react';
import {Image, StyleSheet, FlatList, View, Text, TouchableWithoutFeedback} from 'react-native';
import {Block} from '../../components';
import Moment from 'moment';
import { connect } from 'react-redux';

import { getUserInfo } from '../../redux/actions';

import { 
	Container, 
	Header, 
	Content, 
	Left, 
	Body, 
	Right, 
	Button,
	Icon, 
	Title,
	Card,
	ListItem,
	H1,
	H2,
	Thumbnail,
	Grid,
	Row,
	Col
} from 'native-base';

import i18n from '../../i18n/i18n';
import Enconstruction from '../EnConstuction';
import { theme, params } from '../../constants';


class ClientsDeclare extends React.Component {
	static navigationOptions = ({ navigation }) => ({
	    title: i18n.t('Customers declared title'),
	    drawerLabel: i18n.t('Customers declared label'),
	    drawerIcon: ({ tintColor }) => (
	      <Ionicons
				name="md-menu"
				size={32}
				//onPress={this.props.navigation.openDrawer()}
				/>
	    ),
	  });

	printFullname(client){
		let fullname = "";
		if(client.nom) fullname += client.nom;
		if(client.prenom) fullname += client.prenom;
		return fullname;
	}
	renderRow(client){
		console.log(client);
		//return <ProjectItem project={project.item} />
		 return ( 
		 <TouchableWithoutFeedback  key={client.item.index}
		 	onPress = {() => {
            //this.props.navigation.navigate('ProjectDetail', { project: project.item});
          }}>
          <Card style={styles.cardStyle}>
          <Grid>
	          <Row>
	          	<Left>
	          		<H2>{this.printFullname(client.item)}</H2>
	          	</Left>
          		<Right>
          			<Text style={{color:theme.colors.primary}}>{i18n.t('View status')}</Text>
          		</Right>
	          </Row>
          </Grid>
          </Card>
         </TouchableWithoutFeedback> );
		
	}

	render(){
		return( 
			<Container>
				<Header noRight>
				  <Left>
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('Customers declared title')}</Title>
				  </Body>
				</Header>				
				<Content>
					<Block center>
			       		<Thumbnail
			       	  		large
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1 style={{color:theme.colors.primary}}>{i18n.t('My clients declared')}</H1>
			       </Block>
					<FlatList
						keyExtractor= {(item, index) => index.toString()}
						data={this.props.clients}
						renderItem = {this.renderRow.bind(this)}
					/>
				 	
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle:{
		padding:18,
		marginLeft:20 ,
		marginRight:20 ,
		borderRadius: 10,
	},
	logoImg:{
	    backgroundColor: '#eee',
	}
});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	clients: state.monespace.clients,
});

 export default connect(mapStateToProps, {getUserInfo})(ClientsDeclare);

