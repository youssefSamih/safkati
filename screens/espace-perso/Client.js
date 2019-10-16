import React from 'react';
import { View, StyleSheet, Platform, ImageBackground, Dimensions, I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Moment from 'moment';
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

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
	Text,
	Thumbnail,
	ListItem,
} from 'native-base';

import { selectedClient } from '../../redux/actions';

import i18n from '../../i18n/i18n';
import { params } from '../../constants';

const widthWindo = Dimensions.get("window").width;
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

	printType(type) {
		if (type == 'A') {
			return i18n.t('Apartment');
		} else if (type == 'T') {
			return i18n.t('Ground');
		} else if (type == 'V') {
			return i18n.t('Villa');
		}
	}

	componentWillMount() {
		const { navigation } = this.props;
		const client = navigation.getParam('client');
		console.log("client ", client);
		this.props.selectedClient(client);
		// this.props.infoProject({id: project.id});
	}

	renderStatusValide(status) {
		let text = i18n.t('In the process of validation');
		if (status == params.STATUS_VALID) {
			text = i18n.t('Valid');
		} else if (status == params.STATUS_ANULER) {
			text = i18n.t('Canceled');
		}

		return (
			<ListItem icon noBorder>
				<Left>
					<Button transparent>
						<Thumbnail
							small
							square
							source={params.status.valid} />
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
	renderPrisRdv(prisRdv) {
		let text = i18n.t('Making appointments');
		if (prisRdv) {
			text = i18n.t('Made an appointment on', { date: Moment(prisRdv).format('DD/MM/Y') });
		}

		return (
			<ListItem icon noBorder>
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
	renderStatusRdv(status) {
		let text = i18n.t('in the process of validating appointment');

		if (status == params.STATUS_VALID) {
			text = i18n.t('Appointment') + " : " + i18n.t('Valid');
		} else if (status == params.STATUS_ANULER) {
			text = i18n.t('Appointment') + " : " + i18n.t('Canceled');
		}


		return (
			<ListItem icon noBorder>
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

	renderStatusScv(status) {
		let text = i18n.t('Signature of the sales agreement');
		if (status == 1) {
			text += " : " + i18n.t('Valid');
		}

		return (<ListItem icon noBorder>
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
	renderStatusSav(status) {
		let text = i18n.t('Signature of deed of sale');
		if (status == 1) {
			text += " : " + i18n.t('Valid');
		}
		return (
			<ListItem icon noBorder>
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

	renderStatusInterest(status) {
		//let text = i18n.t('Customer not interested');
		if (status == params.CLIENT_INTEREST) {
			text = i18n.t('Interested customer');
		} else if (status == params.CLIENT_NOINTEREST) {
			text = i18n.t('Customer not interested');
		} else {
			return;
		}
		// 
		return (
			<ListItem icon noBorder>
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

	renderStatus() {
		console.log("this.props.client ", this.props.client);
		const {
			status_validate,
			prise_de_rdv,
			status_rdv,
			status_compromis_vente,
			status_acts_vente,
			status_interest
		} = this.props.client;
		return (
			<View style={styles.stateStyle}>
				{this.renderStatusValide(status_validate)}
				{this.renderPrisRdv(prise_de_rdv)}
				{this.renderStatusRdv(status_rdv)}
				{this.renderStatusScv(status_compromis_vente)}
				{this.renderStatusSav(status_acts_vente)}
				{this.renderStatusInterest(status_interest)}
			</View>
		);
	}

	render() {
		const client = this.props.client;
		return (
			<Container>
				<LinearGradient
					colors={["#f6c552", "#ee813c", "#bf245a"]}
					start={[1.5, 0.6]}
					style={styles.paddHeader}
				>
					<Header transparent noRight>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } />
							</Button>
						</Left>
						<Body style={{ marginLeft: 35 }}>
							<Title>{i18n.t('Client title')}</Title>
						</Body>
					</Header>
				</LinearGradient>
				<ImageBackground source={require('../../assets/images/backpassModif.png')} style={{ flex: 1 }}>
					<Content transparent>
						<LinearGradient
							colors={["#f6c552", "#ee813c", "#bf245a"]}
							start={[1.5, 0.6]}
							style={{ flex: 1, padding: 20, }}
						>
						<View>
							<Card transparent>
								<View style={styles.transparentCard}>
									<View style={styles.directionRow}>
										<Text style={styles.nameClientStyle}>{client && client.nom + ' ' + client.prenom}</Text>
									</View>
									<View style={styles.directionRow}>
										<Text style={{ ...styles.blancColor, ...styles.boldSomeInfo, width: "60%" }}>{client && client.adress} </Text>
										<View style={styles.personalInfo}>
											<Text style={styles.blancColor}>{i18n.t('Budget:')} <Text style={{ ...styles.boldSomeInfo, ...styles.blancColor }}>{client && i18n.t('price dhs',{prix: client.budget})}</Text></Text>
											<Text style={styles.blancColor}>{i18n.t('Tel:')} <Text style={{ ...styles.boldSomeInfo, ...styles.blancColor }}>{client && client.phone}</Text></Text>
										</View>
									</View>
								</View>
								<View style={styles.locationDetailsClient}>
									<Text style={styles.blancColor}>{i18n.t('Declare the')} </Text>
									<View style={{ marginLeft: "20%" }}>
										<Text style={styles.blancColor}>{client && Moment(client.date_creation).format('DD/MM/Y')}</Text>
									</View>
								</View>
								<View style={styles.locationDetailsClient}>
									<Text style={styles.blancColor}>{i18n.t('Project')}: </Text>
									<View style={{ marginLeft: "30%" }}>
										<Text style={styles.blancColor}>{client && client.project}</Text>
									</View>
								</View>
								<View style={styles.locationDetailsClient}>
									<Text style={styles.blancColor}>{i18n.t('type de bien')}: </Text>
									<View style={{ marginLeft: "17%" }}>
										<Text style={styles.blancColor}>{client && this.printType(client.type_de_bien)}</Text>
									</View>
								</View>
							</Card>
						</View>
						</LinearGradient>
							{/*<Button transparent noRight style={{...styles.gradientEditButton, ...styles.editButtonLocation}}>
								<ElevatedView elevation={5} style={styles.elevationStyle}>
									<LinearGradient
										colors={["#f6c552", "#ee813c", "#bf245a"]}
										start={[1.5, 0.6]}
										style={{...styles.buttonContianer, ...styles.gradientEditButton }}
									>
										<Icon name="create" style={{ ...styles.blancColor, ...styles.sizeEditButton }} />
										<Text style={{ ...styles.blancColor, ...styles.sizeEditButton }}>Modifier</Text>
									</LinearGradient>
								</ElevatedView>
							</Button>*/}
						{client && this.renderStatus()}
					</Content>
				</ImageBackground>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	cardStyle: {
		padding: 18,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 10,
	},
	logoImg: {
		backgroundColor: '#eee',
	},
	cardRow: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	cardRowLast: {
		borderBottomWidth: 0,
	},
	stateStyle: {
		padding: 20,
	},
	paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	elevationStyle: { backgroundColor: "transparent" },
	buttonContianer: {
		width: (widthWindo / 2) - 1 ,
		alignItems: "center",
		padding: 10,
		marginTop: 35,
		height: 50
	},
	blancColor: { color: "#fff" },
	sizeEditButton: { fontWeight: "bold", fontSize: 25 },
	gradientEditButton: { borderRadius: 10, flexDirection: 'row', justifyContent: "center" },
	editButtonLocation: { 
		justifyContent: "center", 
		alignItems: "flex-end", 
		top: Platform.OS === 'android' ? -5 : -5, 
},
	locationDetailsClient: { flexDirection: "row", borderBottomColor: "#bf245a", borderBottomWidth: 1, paddingTop: 15, paddingBottom: 15 },
	boldSomeInfo: {fontWeight: "bold"},
	transparentCard: { paddingBottom: 30, width: "70%" },
	nameClientStyle: { color: "#f8c652", fontSize: 20, },
	directionRow: { flexDirection: "row"},
	personalInfo: { flexDirection: 'column', alignItems: "flex-end", marginLeft: 6, textAlign: "left" }
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	client: state.monespace.selectedClient,
});

export default connect(mapStateToProps, { selectedClient })(Client);