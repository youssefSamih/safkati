import React from 'react';
import { Platform, StyleSheet, FlatList, I18nManager, ImageBackground, Dimensions, PixelRatio } from 'react-native';
import { connect } from 'react-redux';
import Moment from 'moment';
import { LinearGradient } from "expo-linear-gradient";

import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Button,
	Icon,
	Title,
	Card,
	H2,
	Grid,
	Row,
	Col,
} from 'native-base';

import i18n from '../../i18n/i18n';
import { theme } from '../../constants';
import { fetchParrainage } from '../../redux/actions';
import FadeIn from '../../components/Animations/FadIn'

const scale = Dimensions.get("window").width / 200   ;
const actuatedNormalize = (size) => {
  let newSize = size * scale
  if (Platform.OS === 'ios') {
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
class MesParrinage extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		title: i18n.t('My referrals title'),
		drawerLabel: i18n.t('My referrals label'),
		drawerIcon: ({ tintColor }) => (
			<Ionicons
				name="md-menu"
				size={32}
			//onPress={this.props.navigation.openDrawer()}
			/>
		),
	});

	componentWillMount() {
		this.props.fetchParrainage(this.props.user.id);
		// this.props.infoProject({id: project.id});
	}

	renderRow = (row) => {
		return (
			<FadeIn>
				<Card transparent>
					<LinearGradient
						colors={["#f6c552", "#ee813c", "#bf245a"]}
						start={[1.5, 0.6]}
						style={{...styles.cardStyle, opacity: .6}}
					>
						<Grid>
							<Row style={styles.cardRow}>
								<Col>
									<H2 style={{...styles.blancColor, fontSize: actuatedNormalize(15)}}>{i18n.t('Name')} :</H2>
								</Col>
								<Col>
									<H2 style={{ color: theme.colors.primary, fontSize: actuatedNormalize(13) }}>{row.item.nom + " " + row.item.prenom}</H2>
								</Col>
							</Row>
							<Row style={styles.cardRow}>
								<Col>
									<H2 style={{...styles.blancColor, fontSize: actuatedNormalize(15)}}>{i18n.t('Created in')} :</H2>
								</Col>
								<Col>
									<H2 style={{ color: theme.colors.primary, fontSize: actuatedNormalize(13) }}>{Moment(row.item.date_creation).format('DD/MM/Y')}</H2>
								</Col>
							</Row>
							<Row style={styles.cardRow}>
								<Col>
									<H2 style={{...styles.blancColor, fontSize: actuatedNormalize(15)}}>{i18n.t('Email')} :</H2>
								</Col>
								<Col>
									<H2 style={{ color: theme.colors.primary, fontSize: actuatedNormalize(13) }}>{row.item.email}</H2>
								</Col>
							</Row>
							<Row style={[styles.cardRow, styles.cardRowLast]}>
								<Col>
									<H2 style={{...styles.blancColor, fontSize: actuatedNormalize(15)}}>{i18n.t('phone')} :</H2>
								</Col>
								<Col>
									<H2 style={{ color: theme.colors.primary, fontSize: actuatedNormalize(13) }}>{row.item.phone}</H2>
								</Col>
							</Row>
						</Grid>
					</LinearGradient>
				</Card>
			</FadeIn>
		);
	}
	render() {
		return (
			<Container>
				<ImageBackground source={require('../../assets/images/backClient.png')} style={{ flex: 1 }}>	
					<Header transparent noRight style={styles.paddHeader}>
						<Left>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } style={styles.violetColor} />
							</Button>
						</Left>
						<Body>
							<Title style={styles.violetColor}>{i18n.t('My referrals title')}</Title>
						</Body>
					</Header>
					<Content>
						<FlatList
							keyExtractor={(item, index) => index.toString()}
							data={this.props.mes_parraines}
							renderItem={this.renderRow}
						/>
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
		borderBottomWidth: 1,
		borderBottomColor: '#eee',
	},
	cardRowLast: {
		borderBottomWidth: 0,
	},
	paddHeader: {
		marginTop: Platform.OS === "android" ? -25 : -5,
		paddingBottom: Platform.OS === "android" ? 0 : 10
	},
	violetColor: { color: "#bf245a" },
	blancColor: { color: "#fff" }
});

const mapStateToProps = (state) => ({
	user: state.auth.user,
	mes_parraines: state.monespace.mes_parraines,
});

export default connect(mapStateToProps, { fetchParrainage })(MesParrinage);