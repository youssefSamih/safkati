import React from 'react';
import { StyleSheet, FlatList, Text, TouchableWithoutFeedback, Platform, ImageBackground, Image, I18nManager } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Right,
	Button,
	Icon,
	Card,
	H2,
	Grid,
	Row,
	View,
	Footer,
	FooterTab,
	Col
} from 'native-base';
import { connect } from 'react-redux';

import { getUserInfo } from '../../redux/actions';
import i18n from '../../i18n/i18n';
import { params } from '../../constants';
import GradientText from '../../components/UI/gradientText';


class ClientsDeclare extends React.Component {
	static navigationOptions = () => ({
		title: i18n.t('Customers declared title'),
		drawerLabel: i18n.t('Customers declared label'),
		drawerIcon: () => (
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
			title: i18n.t('Customers declared title')
		}
	}
	componentWillMount() {
		const { id } = this.props.user;
		this.props.getUserInfo({ id });
	}
	componentDidMount() {
		status_client = this.props.navigation.getParam('status_client');

		this.setState({ status_client });

		if (status_client != null && status_client != undefined) {
			if (status_client == params.STATUS_VALID) {
				this.setState({ title: i18n.t('Verified customers') });
			} else if (status_client == params.STATUS_ANULER) {
				this.setState({ title: i18n.t('Canceled customers') });
			} else if (status_client == params.STATUS_ENCOURS) {
				this.setState({ title: i18n.t('Customers to be confirmed') });
			} else {
				this.setState({ title: i18n.t('Declared customers') });
			}
			const clients = [];
			this.props.clients.map((client, index) => {
				if (client.status_validate == status_client) {
					clients.push(client);
				}// pour les client à comfirmer 0 test aussi si la valeur de status est null
				else if (status_client == params.STATUS_ENCOURS && client.status_validate == null) {
					clients.push(client);
				}
			});
			console.log("clients ", clients);
			this.setState({ clients });

		} else {
			this.setState({ clients: this.props.clients });
		}
		//console.log(this.props.clients);

	}

	printFullname(client) {
		let fullname = "";
		if (client.nom) fullname += client.nom;
		if (client.prenom) fullname += " " + client.prenom;
		return fullname;
	}
	renderRow = (client) => {
		//return <ProjectItem project={project.item} />
		return (
			<TouchableWithoutFeedback key={client.item.index}
				onPress={() => {
					this.props.navigation.navigate('Client', { client: client.item });
				}}>
					<Card transparent>
							<LinearGradient
								colors={["#f6c552", "#ee813c", "#bf245a"]}
								start={[1.5, 0.6]}
								style={{ ...styles.cardStyle, opacity: .6 }}
							>
							<Grid>
								<Row>
									<Left>
										<H2 style={{ color: "#c30839", marginBottom: 5 }}>{this.printFullname(client.item)}</H2>
										<Text style={{ ...styles.colorText , fontSize: 16 }}>Budget: 150 000 Dh</Text>
										<Text style={{ ...styles.colorText, fontSize: 16 }}>Tel: 00212 6 60 60 60 60</Text>
									</Left>
									<Right>
										<View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 5 }}>
											<Text style={styles.colorText}>{i18n.t('View status')} -></Text>
										</View>
									</Right>
								</Row>
							</Grid>
						</LinearGradient>
					</Card>
			</TouchableWithoutFeedback>
			);
	}

	render() {
		return (
			<Container>
				<ImageBackground source={require('../../assets/images/backClient.png')} style={{ flex: 1 }}>
					<Header transparent noRight style={styles.paddHeader}>
						<Left style={styles.leftRightHeaderStyle}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } style={{ ...styles.violetColor, fontSize: 35 }} />
							</Button>
						</Left>
						<Body style={styles.bodyHeaderStyle}>
							<LinearGradient
								colors={["#f6c552", "#ee813c", "#bf245a"]}
								start={[1.5, 0.6]}
								style={styles.principalIcon}
							>
								<Icon name="man" style={{ ...styles.blancColor, fontSize: 20 }} />
							</LinearGradient>
							<GradientText text1={this.state.title} style={styles.principalText} titleStyle={styles.titleStyle} />
						</Body>
						<Right style={styles.leftRightHeaderStyle}>
							<Button transparent>
								<Icon name="share" style={{ ...styles.violetColor, fontSize: 30 }} />
							</Button>
						</Right>
					</Header>
					<Content>
						<FlatList
							keyExtractor={(item, index) => index.toString()}
							data={this.state.clients}
							renderItem={this.renderRow}
						/>
						<Grid>
							<Col size={1}>
								<Right style={{ left: 70 }}>
									<Button transparent>
										<H2 style={{ color: "#bf245a", marginRight: 5 }}>Déclarer un client</H2>
										<View style={{ backgroundColor: "#bf245a", borderRadius: 10, padding: 5, width: 35, height: 35, justifyContent: "center", alignItems: 'center', paddingTop: Platform.OS === "android" ? 5 : 0 }}>
											<Icon name="add" style={{ ...styles.blancColor, fontSize: 35 }} />
										</View>
									</Button>
								</Right>
							</Col>
						</Grid>
					</Content>
					<Footer style={styles.FooterHeigh}>
            <FooterTab>
              <LinearGradient
                colors={["#f6c552", "#ee813c", "#bf245a"]}
                style={styles.gradientFooterStyle}
                start={[1.5, 0.6]}
              >
                <Grid style={styles.FooterGridCenter}>
                  <Col size={1}>
                    <Right>
                      <Image
                        style={styles.faceImg}
                        source={require("../../assets/images/bottomLogoSignup.png")}
                      />
                    </Right>
                  </Col>
                  <Col size={3}>
                    <Row>
                      <Text style={styles.footerText}>{i18n.t("Caller")}</Text>
                    </Row>
                    <Row>
                      <Text style={styles.footerText}>
                        {i18n.t("Caller Contact")}
                      </Text>
                    </Row>
                  </Col>
                </Grid>
              </LinearGradient>
            </FooterTab>
          </Footer>
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
	paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	leftRightHeaderStyle: { flex: 1 },
	violetColor: { color: "#bf245a" },
	principalIcon: {
		marginLeft: -300,
		borderRadius: Platform.OS === 'android' ? 105 : 15,
		padding: 6,
		marginTop: Platform.OS === 'android' ? 11 : 0,
		height: 30,
		justifyContent: "center", 
		alignItems: 'center',
		width: 30
	},
	blancColor: { color: "#fff" },
	principalText: { 
		marginTop: Platform.OS === "android" ? ( I18nManager.isRTL ? -38 : -3 ) : -30,
		marginLeft: Platform.OS === "android" ? ( I18nManager.isRTL ? -120 : 3 ) : -100
	},
	titleStyle: { fontSize: 20 },
	bodyHeaderStyle: { alignItems: "center", marginLeft: 140 },
	colorText: {color: "#ffb300"},
	gradientFooterStyle: {
    flex: 1,
    padding: 10
	},
	FooterGridCenter: {
    marginRight: 10,
    marginLeft: 30
	},
	faceImg: {
    height: 60,
    width: 60,
    marginTop: Platform.OS === "android" ? -5 : -10
	},
	footerText: {
    color: "white",
    fontSize: 12
	},
	FooterHeigh: {
    height: 70
	},
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	clients: state.monespace.clients,
});

export default connect(mapStateToProps, { getUserInfo })(ClientsDeclare);

