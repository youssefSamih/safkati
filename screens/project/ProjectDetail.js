import React from 'react';
import { View, Text, Dimensions, Image, StyleSheet, WebView, Platform, ImageBackground, I18nManager, PixelRatio } from 'react-native';
//import { Actions } from 'react-native-router-flux';
import { SliderBox } from 'react-native-image-slider-box';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from "expo-linear-gradient";
import ElevatedView from 'react-native-elevated-view';

import { H2, Button, Icon, Container, Content, Header, Left, Body, Title, Spinner, Right } from 'native-base';
import { Block } from '../../components';

import { connect } from 'react-redux';
import { infoProject, initialCurrentProjet } from '../../redux/actions';

import i18n from '../../i18n/i18n';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 20.794660188257694 /*LATITUDE_DELTA * ASPECT_RATIO*/;
const windowWidth = Dimensions.get("window").width;

const scale = Dimensions.get("window").width / 200   ;
const actuatedNormalize = (size) => {
  let newSize = size * scale
  if (Platform.OS === 'ios') {
  return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
};

class ProjectDetail extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });
  componentWillMount() {
    const { navigation } = this.props;
    const project = navigation.getParam('project');
    // use project info from the listing until the request http for gettion all the project info is completed
    this.props.initialCurrentProjet(project);
    this.props.infoProject({ id: project.id });
  }
  printPrix(min, max) {
    if (min && max) {
      return i18n.t('min - max', { min, max });
    }
    if (min) {
      return i18n.t('from price', { prix: min });
    }
    return;

  }
  printTags(tags) {
    tags = tags && tags.replace(/,/gi, " - ");
    return tags;
  }

  renderGallery() {
    const images = this.props.gallery;
    if (!images) {
      return (
        <Block center middle style={{ height: height / 2.4 }}>
          <Spinner />
        </Block>
      );
    }
    if (images && images.constructor === Array && images.length === 0) {
      return (
        <Image
          source={{ uri: this.props.project.cover }}
          //source={this.props.cover}
          // resizeMode="contain"
          style={{ width, height: height / 2.4, margin: 0 }}
        />
      );
    }
    return <SliderBox
      sliderBoxHeight={height / 2.4}
      images={images}
      circleLoop
      dotColor="#f6c552"
      dotStyle={styles.dotStyle}
      inactiveDotColor="#bf245a45"
    />;
  }

  renderYoutube(youtube_id) {
    if (!youtube_id) {
      return;
    }

    return (
      <WebView
        style={{ width, height: 300 }}
        javaScriptEnabled={true}
        source={{ uri: 'https://www.youtube.com/embed/' + youtube_id + '?rel=0&autoplay=0&showinfo=0&controls=0' }}
      />
    );
  }

  renderMap() {
    const coords = {
      latitude: parseFloat(this.props.project.geo_latitude),
      longitude: parseFloat(this.props.project.geo_longitude),
    }
    if (coords.longitude && coords.latitude) {
      return (
        <>
          <Title>
            Location
              </Title>
          <MapView style={{ flex: 1, height: 300, width }}
            zoomEnabled
            zoomTapEnabled
            zoomControlEnabled
            showsScale
            showsBuildings
            showsTraffic
            region={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
          >
            <Marker coordinate={{
              latitude: coords.latitude,
              longitude: coords.longitude,
            }}>
            </Marker>
          </MapView>
        </>
      );
    }
    return;
  }
  render() {

    const project = this.props.project;
    const coords = {
      latitude: parseFloat(project.geo_latitude),
      longitude: parseFloat(project.geo_longitude),
    }
    const tag = project.tags ? project.tags.split(",") : ""
    // console.log(project.tags ? project.tags.split(" , ") : "");
    // console.log(coords);
    return (
      <Container>
        <LinearGradient
          colors={["#f6c552", "#ee813c", "#bf245a"]}
          start={[1.5, 0.6]}
          style={styles.paddHeader}
        >
          <Header transparent noRight>
            <Left style={styles.leftHeader}>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name={ I18nManager.isRTL ? "arrow-forward" : "arrow-back" } />
              </Button>
            </Left>
            <Body style={styles.titleHeader}>
              <Title>{project && project.libelle}</Title>
            </Body>
            <Right>
              <Button transparent>
                {/* <Icon name="share" /> */}
              </Button>
            </Right>
          </Header>
        </LinearGradient>
        <Content style={{ width }}>
          {this.renderGallery()}
          <View style={styles.contentTag}>
            <View style={{ ...styles.colorBlanc, padding: 5 }} />
            <View style={styles.tagStyles}>
              { tag[0] ? <View style={{...styles.propertyBorder, backgroundColor: "#e8d19b"}}><Text style={styles.tagTextStyle}> {tag[0]} </Text></View> : null }
              { tag[1] ? <View style={{...styles.propertyBorder, backgroundColor: "#f8c652"}}><Text style={styles.tagTextStyle}> {tag[1]} </Text></View> : null }
              { tag[2] ? <View style={{...styles.propertyBorder, backgroundColor: "#f29851"}}><Text style={styles.tagTextStyle}> {tag[2]} </Text></View> : null }
              { tag[3] ? <View style={{...styles.propertyBorder, backgroundColor: "#d29197"}}><Text style={styles.tagTextStyle}> {tag[3]} </Text></View> : null }
              { tag[4] ? <View style={{...styles.propertyBorder, backgroundColor: "#ca4e58"}}><Text style={styles.tagTextStyle}> {tag[4]} </Text></View> : null }
            </View>
          </View>
          <ImageBackground source={require('../../assets/images/backDetail.png')} style={{ width: "100%" }}>
            <LinearGradient
              colors={["#f6c552", "#ee813c", "#bf245a"]}
              start={[1.5, 0.6]}
              style={styles.gradientMain}
            >
              <View style={styles.itemProjet}>
                <H2 style={styles.libelleStyle}>{project && project.libelle}</H2>
                <Text note numberOfLines={1} style={styles.colorBlanc}>{project && project.town}</Text>
                <Text note numberOfLines={1} style={styles.colorBlanc}>{project && project.type_de_bien}</Text>
                <View><Text style={styles.prixStyle} >{project && this.printPrix(project.prix_min, project.prix_max)}</Text></View>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={{
            paddingHorizontal: 16 * 2,
            paddingVertical: 25
          }}>
            <Text note>
              {project.description && project.description.replace(/<p>/gi, "")}
            </Text>
          </View>

          <View style={{ paddingBottom: 10 }}>
            {this.renderYoutube(project.youtube_id)}
          </View>
          <View style={{ paddingBottom: 10 }}>
            {
              this.renderMap()
            }
          </View>
          <Block style={{ paddingBottom: 10 }} center>
            <ElevatedView elevation={5} style={{ backgroundColor: '#gray', marginBottom: 50 }}>
              <Button
                rounded
                transparent
                onPress={() => this.props.navigation.navigate('DeclareClient', { projectId: project.id })}
              >
                <LinearGradient
                  colors={['#f6c552', '#ee813c', '#bf245a']}
                  style={{...styles.buttonContianer, borderRadius: 10}}
                  start={[1.5, 0.6]}
                >
                  <Text style={styles.button}>{i18n.t("Declare client")}</Text>
                </LinearGradient>
              </Button>
            </ElevatedView>
          </Block>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  itemProjet: {
    marginBottom: 2,
    padding: 12,
    alignItems: "flex-start"
  },
  itemImg: {
    width: "100%",
    height: "100%",
  },
  libelleStyle: {
    color: '#FFF',
    //fontWeight: '500'
  },
  prixStyle: {
    textAlign: 'right',
    fontWeight: '600',
    color: "#fff"
  },
  button: {
    color: 'white',
    padding: 12,
    fontSize: actuatedNormalize(10),
    marginTop: -10,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)'
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB'
  },
  paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
  },
  leftHeader: { flex: 1 },
  titleHeader: { alignItems: 'center' },
  dotStyle: { 
    top: -230,
    width: 15,
    height: 15,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  gradientMain: { opacity: .8 },
  colorBlanc: { color: "#fff" },
  propertyBorder: { 
    width: 55, 
    height: 55, 
    borderRadius: 100, 
    borderWidth: 2, 
    borderColor: "#fff",
    top: -25,
    marginRight: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  tagStyles: { 
    flexDirection: "row", 
    justifyContent: "flex-start", 
    position: "absolute",
    width: windowWidth / 10, 
    right: 220,
  },
  tagTextStyle: { 
    fontSize: 10,
    textAlign: "center",
  },
  buttonContianer: {
    width: (windowWidth / 2) - 1 ,
    alignItems: "center",
    padding: 10,
    marginTop: 35,
    height: 50
  },
  contentTag: { zIndex: 5 }
});

const mapStateToProps = (state) => {

  return {
    error: state.currentProject.error,
    loading: state.currentProject.loading,
    project: { ...state.currentProject.project },
    gallery: state.currentProject.gallery
  };
};

export default connect(mapStateToProps, { infoProject, initialCurrentProjet })(ProjectDetail);
