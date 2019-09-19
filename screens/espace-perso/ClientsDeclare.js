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

	constructor(props) {
	    super(props);
	    this.state = {
	      status_client: null,
	      clients: [],
	      title:i18n.t('Customers declared title')
	    }
	  }
	  componentWillMount(){
	  	const {id} = this.props.user;
		this.props.getUserInfo({id});
	  }
	 componentDidMount(){
	 	status_client = this.props.navigation.getParam('status_client');

	 	this.setState({status_client});

	 	if(status_client !=null && status_client != undefined){
	 		if(status_client == 1){
	 			this.setState({title: i18n.t('Verified customers')});
	 		}else if(status_client == 9){
	 			this.setState({title: i18n.t('Canceled customers')});
	 		}else if(status_client == 0){
	 			this.setState({title: i18n.t('Customers to be confirmed')});
	 		}else{
	 			this.setState({title: i18n.t('Declared customers')});
	 		}
	 		const clients = [];
	 		this.props.clients.map((client, index) =>{
		 		if(client.status_validate == status_client){
		 			clients.push(client);
		 		}// pour les client à comfirmer 0 test aussi si la valeur de status est null
		 		else if(status_client == 0 && client.status_validate == null){
		 			clients.push(client);
		 		}
		 	});
		 	console.log("clients " ,clients);
		 	this.setState({clients});

	 	}else{
	 		this.setState({clients: this.props.clients});
	 	}
	 	//console.log(this.props.clients);
	 	
	 }

	printFullname(client){
		let fullname = "";
		if(client.nom) fullname += client.nom;
		if(client.prenom) fullname +=" "+client.prenom;
		return fullname;
	}
	renderRow(client){
		//return <ProjectItem project={project.item} />
		 return ( 
		 <TouchableWithoutFeedback  key={client.item.index}
		 	onPress = {() => {
            this.props.navigation.navigate('Client', { client: client.item});
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
				    <Title>{this.state.title}</Title>
				  </Body>
				</Header>				
				<Content>
					<Block center padding={18}>
			       		<Thumbnail
			       	  		large
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1 style={{color:theme.colors.primary}}>{this.state.title}</H1>
			       </Block>
					<FlatList
						keyExtractor= {(item, index) => index.toString()}
						data={this.state.clients}
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

