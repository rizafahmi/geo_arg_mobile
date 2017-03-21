import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, ScrollView, Image, Dimensions, TouchableHighlight } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, Thumbnail, Title, Text, Button, Header, Footer, FooterTab} from 'native-base';
import { fetchEvents, joinGame } from '../actions'
import Carousel from 'react-native-looped-carousel'
const {height, width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
const iconhome = (<Icon name="home" size={30} color="white" />)
const iconinfo = (<Icon name="info" size={30} color="white" />)
const iconback = (<Icon name="fast-rewind" size={30} color="white" />)

class ListEvent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      size: {width, height}
    }
  }

  componentDidMount () {
    this.props.fetchEvents()
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigator.pop()}
            >
              <Icon name='arrow-back' />
              <Title>Back</Title>
            </Button>
          </Left>
        </Header>
        <Content>
          <View style={styles.container}>
            <Image
              style={{flex: 1, width:'100%', height:'100%', position:'absolute'}}
              source={require('../assets/bglistevent.jpg')}
            />
            <View style={styles.listevent}>
              <Carousel
                delay={5000}
                style={this.state.size}
                bullets={true}
              >
                { this.props.events.length !== 0
                  ?
                  this.props.events.map((listevent, index) => {
                    return (
                      <View key={index} style={{flex: 1, marginLeft:'0.1%', marginRight:'0.1%', marginTop:'1.5%', height: '80%'}}>
                        <Image style={{flex: 1, width: '100%', height: '100%'}} source={require('../assets/bglist1.jpg')} />
                        <View style={{position:'absolute', alignItems: 'center', marginTop: "10%",  backgroundColor: 'white'}}>
                          <Text>Event Name: {listevent.title}</Text>
                          <Text>Task: {listevent.description}</Text>
                          <Text>Date: {listevent.date.toString().slice(0,10)}</Text>
                          <Text>Place: {listevent.place}</Text>
                          <Text>Point: {listevent.eventScore}</Text>
                        </View>
                        <View style={styles.buttonLogin}>
                          <Button onPress={()=>{
                              this.props.joinGame(listevent)
                              this.props.navigator.push({page: 'game'})
                            }}>
                            <Text style={{color: 'white', marginRight: '10%', fontSize: 20, alignItems: 'center'}}>Join Now</Text>
                          </Button>
                        </View>
                      </View>
                    )
                  })
                  :
                  <View></View>
                }
              </Carousel>
            </View>
          </View>
        </Content>
        <Footer>
          <FooterTab style={{backgroundColor:'rgba(71, 96, 90, 0.89)',}}>
            <Button onPress={() =>null }>
              {iconback}
            </Button>
            <Button>
              {iconhome}
            </Button>
            <Button onPress={() => null}>
              {iconinfo}
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0
  },
  listevent:{
    marginBottom: '15%'
  },
  buttonLogin:{
    position: 'absolute',
    width: width,
    bottom: width-370,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInButton: {
    height: 60,
    width: width,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(138, 208, 49)',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  }
})


const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    joinGame: (eventData) => dispatch(joinGame(eventData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListEvent)