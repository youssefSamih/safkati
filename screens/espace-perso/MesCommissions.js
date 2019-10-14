import React from 'react';
import { ImageBackground, StyleSheet, Platform, Image, Text, View, I18nManager, Dimensions, PixelRatio } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
	Footer,
	FooterTab,
	Grid,
	Col,
	Row,
	Card,
	H2
} from 'native-base';
import { connect } from 'react-redux';

import i18n from '../../i18n/i18n';
import { theme } from '../../constants';
import { fetchCommissions } from '../../redux/actions';
import GradientText from '../../components/UI/gradientText';


const scale = Dimensions.get("window").width / 200   ;
const actuatedNormalize = (size) => {
  let newSize = size * scale
  if (Platform.OS === 'ios') {
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}

class MesCommissions extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('My commissions title'),
		drawerLabel: i18n.t('My commissions label'),
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
			tableHead: [i18n.t('Customer name'), i18n.t('Project'), i18n.t('Commission')],
			widthArr: [170, 180, 90]
		}
	}

	componentWillMount() {
		this.props.fetchCommissions(this.props.user.id);
		// this.props.infoProject({id: project.id});
	}
	render() {
		const state = this.state;
		const tableData = [];
		this.props.commissions.map((commission, index) => {
			tableData.push([commission.projet, commission.commission]);
		});

		return (
			<Container>
				<ImageBackground source={require('../../assets/images/backClient.png')} style={{ flex: 1 }}>
					<Header transparent noRight style={styles.paddHeader}>
						<Left style={styles.leftRightHeaderStyle} style={{ ...styles.violetColor, fontSize: actuatedNormalize(35) }}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } style={{ ...styles.violetColor, fontSize: actuatedNormalize(30) }} />
							</Button>
						</Left>
						<Body style={styles.bodyHeaderStyle} noRight >
							<LinearGradient
								colors={["#f6c552", "#ee813c", "#bf245a"]}
								start={[1.5, 0.6]}
								style={styles.principalIcon}
							>
								<Icon name="logo-usd" style={{ ...styles.blancColor, fontSize: 20 }} />
							</LinearGradient>
							<GradientText text1={i18n.t('My commissions title')} style={styles.principalText} titleStyle={styles.titleStyle} />
						</Body>
						<Right style={styles.leftRightHeaderStyle}>
							<Button transparent>
								{/* <Icon name="share" style={{ ...styles.violetColor, fontSize: 30 }} /> */}
							</Button>
						</Right>
					</Header>
					<Content>
						<Card transparent style={{ marginTop: "10%" }}>
								<LinearGradient
									colors={["#f6c552", "#ee813c", "#bf245a"]}
									start={[1.5, 0.6]}
									style={styles.cardStyle}
								>
								<Grid>
									<Row>
										<Left>
											<H2 style={{ color: "#facf6d", marginBottom: 5, fontSize: actuatedNormalize(12) }}>{i18n.t('Project')}</H2>
										</Left>
										<Right>
											<H2 style={{ color: "#facf6d", marginBottom: 5, fontSize: actuatedNormalize(12) }}>{i18n.t('Commission')}</H2>
										</Right>
									</Row>
								</Grid>
							</LinearGradient>
						</Card>
						<View style={{ marginTop: "5%" }}>
							{
								tableData.map((rowData, index) => (
									<Card transparent style={{ marginTop: "1%" }} key={index}>
											<LinearGradient
												colors={["#f6c552", "#ee813c", "#bf245a"]}
												start={[1.5, 0.6]}
												style={{...styles.cardStyle, opacity: .6}}
											>
											<Grid>
												<Row>
													<Left>
														<H2 style={{ color: "#fff", marginBottom: 5, fontSize: actuatedNormalize(10) }}>{rowData[0]} Dhs</H2>
													</Left>
													<Right>
														<H2 style={{ color: "#fff", marginBottom: 5, fontSize: actuatedNormalize(10) }}>{rowData[1]} Dhs</H2>
													</Right>
												</Row>
											</Grid>
										</LinearGradient>
									</Card>
								))
							}
							{/* <Grid>
								<Col size={1}>
									<Right style={{ left: 45 }}>
										<Button transparent>
											<H2 style={{ color: "#bf245a", marginRight: 5 }}>Déclarer une commission</H2>
											<View style={styles.addIconStyle}>
												<View>
													<Text style={{ fontSize: 35, ...styles.blancColor, marginTop: Platform.OS === "ios" ? -5 : 0 }}>+</Text>
												</View>
											</View>
										</Button>
									</Right>
								</Col>
							</Grid> */}
						</View>
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
	container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
	header: { height: 50, backgroundColor: theme.colors.primary },
	text: { textAlign: 'center', fontWeight: '100' },
	textHeader: { color: 'white', textAlign: 'center' },
	dataWrapper: { marginTop: -1 },
	row: { height: 40, backgroundColor: '#E7E6E1' },
	logoImg: { backgroundColor: '#eee' },
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5,
		paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	leftRightHeaderStyle: { flex: 1 },
	blancColor: { color: "#fff" },
	titleStyle: { fontSize: 20 },
	principalText: {
		marginTop: Platform.OS === "android" ? ( I18nManager.isRTL ? -50 : -8 ) : -30,
		marginLeft: Platform.OS === "android" ? ( I18nManager.isRTL ? -150 : "1%") : ( I18nManager.isRTL ? -100 : -50 )
	},
	violetColor: { color: "#bf245a" },
	principalIcon: {
		marginLeft: Platform.OS === 'ios' ? ( I18nManager.isRTL ? -200 : -295 ) : -295 ,
		borderRadius: Platform.OS === 'android' ? 105 : 15,
		padding: 6,
		marginTop: Platform.OS === 'android' ? 10 : 0,
		height: 30,
		justifyContent: "center", 
		alignItems: 'center',
		width: 30
	},
	bodyHeaderStyle: { 
		flex: 1,
		alignItems: "center",
		transform: [
      { translateX: I18nManager.isRTL ? actuatedNormalize(-70) : actuatedNormalize(70) },
    ]
	},
	FooterHeigh: {
    height: 70
	},
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
	cardStyle: {
		padding: 18,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 10,
	},
	addIconStyle: { 
		backgroundColor: "#bf245a", 
		borderRadius: 10, 
		padding: 5, 
		width: 35, 
		height: 35, 
		justifyContent: "center", 
		alignItems: 'center', 
		paddingTop: Platform.OS === "android" ? 5 : 0 
	}
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	commissions: state.monespace.commissions,
});

export default connect(mapStateToProps, { fetchCommissions })(MesCommissions);
