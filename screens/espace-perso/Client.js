import React from 'react';
import {View, StyleSheet, Platform, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Moment from 'moment';

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
	Grid,
	Row,
	Col,
	H1,
	H2,
	Text,
	Thumbnail,
	ListItem,
	Separator
} from 'native-base';

import { selectedClient } from '../../redux/actions';

import i18n from '../../i18n/i18n';
import {Block} from '../../components';
import { theme, params } from '../../constants';

class Client extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		    title: i18n.t('Client title'),
		    drawerLabel: i18n.t('Client label'),
		    drawerIcon: ({ tintColor }) => (
		      <Ionicons
					name="md-menu"
					size={32}
					//onPress={this.props.navigation.openDrawer()}
					/>
		    ),
	});

	printType(type){
		if(type == 'A'){
			return i18n.t('Apartment');
		}else if(type == 'T'){
			return i18n.t('Ground');
		}else if(type == 'V'){
			return i18n.t('Villa');
		}
	}

	componentWillMount(){
	    const { navigation } = this.props;
	    const client = navigation.getParam('client');
	    console.log("client ", client);
	    this.props.selectedClient(client) ;
	 	// this.props.infoProject({id: project.id});
 	}

 	renderStatusValide(status){
 		let text = i18n.t('In the process of validation');
 		if(status == params.STATUS_VALID){
 			text = i18n.t('Valid');
 		}else if(status == STATUS_ANULER){
 			text = i18n.t('Canceled');
 		}

 		return (
 			<ListItem icon>
		        <Left>
		          <Button transparent>
		            <Thumbnail
		            	small
		            	square
			          	source={params.status.valid} />
		          </Button>
		        </Left>
		        <Body>
		          <Text>{text }</Text>
		        </Body>
		        <Right>
		          {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
		        </Right>
	        </ListItem>
        );
 		
 	}
 	renderPrisRdv(prisRdv){
 		let text = i18n.t('Making appointments');
 		if(prisRdv){
 			text = i18n.t('Made an appointment on',{date: Moment(prisRdv).format('DD/MM/Y')});
 		}

 		return(
 			<ListItem icon>
            <Left>
              <Button transparent>
                <Thumbnail
	            	small
	            	square
		          	source={params.status.pris_rdv} />
              </Button>
            </Left>
            <Body>
              <Text>{text}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
 		);
 	}
 	renderStatusRdv(status){
 		let text = i18n.t('in the process of validating appointment');

 		if(status == params.STATUS_VALID){
 			text = i18n.t('Appointment')+" : "+i18n.t('Valid');
 		}else if(status == params.STATUS_ANULER){
 			text = i18n.t('Appointment')+" : "+i18n.t('Canceled');
 		}


 		return (
 			<ListItem icon>
	            <Left>
	              <Button transparent>
	                <Thumbnail
		            	small
		            	square
			          	source={params.status.status_rdv} />
	              </Button>
	            </Left>
	            <Body>
	              <Text>{text}</Text>
	            </Body>
	            <Right>
	              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
	            </Right>
	        </ListItem>
 		);
 	}

 	renderStatusScv(status){
 		let text = i18n.t('Signature of the sales agreement');
 		if(status == 1){
 			text += " : "+i18n.t('Valid');
 		}

 		return (<ListItem icon>
            <Left>
              <Button transparent>
                <Thumbnail
	            	small
	            	square
		          	source={params.status.scv} />
              </Button>
            </Left>
            <Body>
              <Text>{text}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>)
 	}
 	renderStatusSav(status){
 		let text = i18n.t('Signature of deed of sale');
 		if(status == 1){
 			text += " : "+i18n.t('Valid');
 		}
 		return (
 			<ListItem icon>
            <Left>
              <Button transparent>
                <Thumbnail
	            	small
	            	square
		          	source={params.status.sav} />
              </Button>
            </Left>
            <Body>
              <Text>{text}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
 		);
 	}

 	renderStatusInterest(status){
 		//let text = i18n.t('Customer not interested');
 		if(status == params.CLIENT_INTEREST){
 			text = i18n.t('Interested customer');
 		}else if(status == params.CLIENT_NOINTEREST){
 			text = i18n.t('Customer not interested');
 		}else {
 			return ;
 		}
 		// 
 		return(
 			<ListItem icon>
            <Left>
              <Button transparent>
                <Thumbnail
	            	small
	            	square
		          	source={params.status.client_interest} />
              </Button>
            </Left>
            <Body>
              <Text>{text}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>
        );
 	}

 	renderStatus(){
 		console.log("this.props.client ", this.props.client);
 		const {
 			status_validate, 
 			prise_de_rdv, 
 			status_rdv, 
 			status_compromis_vente, 
 			status_acts_vente, 
 			status_interest 
 		} = this.props.client;
 		return(
 		<View style={styles.stateStyle}>
          {this.renderStatusValide(status_validate)}
          {this.renderPrisRdv(prise_de_rdv)}
          {this.renderStatusRdv(status_rdv)}
          {this.renderStatusScv(status_compromis_vente)}
          {this.renderStatusSav(status_acts_vente)}
          {this.renderStatusInterest(status_interest)}
          {/*
          <ListItem icon>
            <Left>
              <Button transparent>
                <Icon large name="star" />
              </Button>
            </Left>
            <Body>
              <Text>{i18n.t('Customer not interested')}</Text>
            </Body>
            <Right>
              {Platform.OS === "ios" && <Icon active name="arrow-forward" />}
            </Right>
          </ListItem>*/}
          </View>
          );
 	}

	render(){
		const client = this.props.client;
		return( 
			<Container>
				<Header noRight>
				  <Left>
			          <Button transparent onPress={() =>  this.props.navigation.goBack()}>
			            <Icon name="arrow-back" />
			          </Button>
			      </Left>
				  <Body>
				    <Title>{i18n.t('Client title')}</Title>
				  </Body>
				</Header>				
				<Content>
					<Block center padding={18}>
			       		<Thumbnail
			       	  		large
			       	 		style={styles.logoImg}
			          		source={params.app.LOGO} />
			          	<H1 style={{color:theme.colors.primary}}>{i18n.t('Customer state declares')}</H1>
			       </Block>
				 	<View>
				 		<Card style={styles.cardStyle}>
				 			<Grid>
					          <Row style={styles.cardRow}>
					          	<Left>
					          		<H2>{i18n.t('Name')} :</H2>
					          	</Left>
				          		<Right>
				          			<H2 style={{color:theme.colors.primary}}>{client && client.nom+' '+client.prenom}</H2>
				          		</Right>
					          </Row>
					          <Row style={styles.cardRow}>
					          	<Left>
					          		<H2>{i18n.t('Declare the')} :</H2>
					          	</Left>
				          		<Right>
				          			<H2 style={{color:theme.colors.primary}}>{client && Moment(client.date_creation).format('DD/MM/Y')}</H2>
				          		</Right>
					          </Row>
					          <Row style={styles.cardRow}>
					          	<Left>
					          		<H2>{i18n.t('Project')} :</H2>
					          	</Left>
				          		<Right>
				          			<H2 style={{color:theme.colors.primary}}>{client && client.project}</H2>
				          		</Right>
					          </Row>
					          <Row style={[styles.cardRow, styles.cardRowLast]}>
					          	<Left>
					          		<H2>{i18n.t('type de bien')} :</H2>
					          	</Left>
				          		<Right>
				          			<H2 style={{color:theme.colors.primary}}>{client && this.printType(client.type_de_bien)}</H2>
				          		</Right>
					          </Row>
				          	</Grid>
				 		</Card>
				 		
				 	</View>
			      {client && this.renderStatus()}
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
	},
	cardRow:{
		paddingTop: 10,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	cardRowLast: {
		borderBottomWidth: 0,
	},
	stateStyle: {
		paddingTop: 18,
	}
});

const mapStateToProps = (state) => ({
  	user: state.auth.user,
  	client: state.monespace.selectedClient,
});

export default connect(mapStateToProps, { selectedClient })(Client) ;