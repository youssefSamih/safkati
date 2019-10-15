import React from 'react';
import { StyleSheet, Platform, I18nManager, ImageBackground } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { LinearGradient } from "expo-linear-gradient";
import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Icon,
	Title,
	Button,
} from 'native-base';

import i18n from '../../i18n/i18n';

class MesMessageries extends React.Component {
  state = {
    messages: [],
  }
 
  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }
 
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
 
  render() {
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
						<Body style={{ marginLeft: 50 }}>
							<Title>Support</Title>
						</Body>
					</Header>
				</LinearGradient>
				{/* <Content> */}
					<ImageBackground source={require('../../assets/images/backClient.png')} style={{ flex: 1}}>	
						<GiftedChat
							messages={this.state.messages}
							onSend={messages => this.onSend(messages)}
							user={{
								_id: 1,
							}}
						/>
			 		</ImageBackground>
				 {/* </Content> */}
			</Container>
    )
  }
}

const styles = StyleSheet.create({
	paddHeader: {
    marginTop: Platform.OS === "android" ? -25 : -5,
    paddingBottom: Platform.OS === "android" ? 0 : 10
	},
})

export default MesMessageries ;