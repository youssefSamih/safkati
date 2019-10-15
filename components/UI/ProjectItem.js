import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native'
import FadIn from '../Animations/FadIn';
import { LinearGradient } from 'expo-linear-gradient';

const ProjectItem = ({ project, navigation, printPrix }) => {
    console.log(project)
    return (
      <FadIn>
          <TouchableOpacity style={styles.main_container} onPress={() => navigation.navigate('ProjectDetail', { project: project.item })}> 
              <ImageBackground 
                  style={{ 
                    height: "100%",
                    width: "100%",
                    position: 'relative',
                    flex: 1
                  }}
                  source={{uri: project.item.cover }}
              >
                <Text style={styles.title_text_img}>{ printPrix(project.item.prix_min, project.item.prix_max) }</Text>
              </ImageBackground>
              <ImageBackground source={require('../../assets/images/listProject.png')} style={styles.backgroundImage}>
                <LinearGradient
                    colors={["#bf245a", "#ee813c", "#f6c552"]}
                    start={[1, 0.6]}
                    style={styles.content_container}
                >
                  <View style={styles.details}>
                    <View style={styles.header_container}>
                        <Text style={styles.title_text}>{ project.item.libelle ? project.item.libelle.toUpperCase() : project.item.libelle}</Text>
                        <Text style={styles.townText}>
                        {
                          project.item.town ? project.item.town.toUpperCase() : project.item.town
                        }
                        </Text>
                        <Text style={project.item.type_de_bien ? styles.typeText : ''}>
                          {project.item.type_de_bien}
                        </Text>
                    </View>
                    <View style={styles.description_container}>
                        <Text style={styles.description_text} numberOfLines={5}>{project.item.description}</Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
        </TouchableOpacity>
      </FadIn>
    )
}

const styles = StyleSheet.create({
  main_container: {
    height: 210,
    flexDirection: 'row',
    marginTop: 5
  },
  image: {
    width: "50%",
    height: "100%",
  },
  content_container: {
    flex: 1,
    padding: 5,
    opacity: .7
  },
  details: {
    flex: 1,
    marginLeft: 10
  },
  header_container: {
    flex: 5,
    flexDirection: 'column',
  },
  title_text: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
    flexWrap: 'wrap',
    paddingRight: 5,
    color: "#f6c552"
  },
  title_text_img: { 
    fontSize: 14,
    backgroundColor: "#f6c552",
    width: "70%",
    paddingLeft: 5,
    color: '#bf245a',
    marginTop: 10,
    position: 'absolute', // child
    top: 5, // position where you want
    left: 0
  },
  townText: {
      fontWeight: '100',
      fontSize: 15,
      color: "#f6c552"
  },
  description_container: {
      flex: 7,
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 5
  },
  description_text: {
      color: '#fff',
      marginTop: 10
  },
  date_container: {
      flex: 1
  },
  typeText: {
    fontSize: 14,
    backgroundColor: "#f6c552",
    width: "70%",
    paddingLeft: 5,
    borderRadius: 80,
    color: '#bf245a',
    marginTop: 10
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  },
  backgroundImage: {
    width: "100%",
    flex: 1.3,
  },
})

export default ProjectItem