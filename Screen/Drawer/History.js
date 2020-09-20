import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert,Linking} from 'react-native';
import { Card,Divider } from 'react-native-paper';
import Header from '../../Components/Header'
import { retrivedata } from '../../assets/Functions'
import Spinner from 'react-native-loading-spinner-overlay';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class History extends Component {

  state = {
    initialData: [],
    page: 1,
    loading: false,
    totaldata:0
  }

  async componentDidMount() {
    this.setState({ loading: true })
    this.LoadData()
    //this.setState({loading:false})
  }

  LoadData = async() => {
    const token = await retrivedata('token')
    if (token != '') {
      fetch('https://instabuzz.cloudexter.in/api/history?page=' + this.state.page, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json',
        }
      }).then((response) => response.json())
        .then((datac) => {
          this.setState({totaldata:datac.total})
          if (datac) {
            //console.log(datac.data)
            this.setState({ loading: false })
            this.setState({ initialData: this.state.initialData.concat(datac.data) })
          }
        })
    }
  }

  gotolink = (link) =>{
    Linking.openURL(link);
  }

  handleLoadMore = () => {
    this.setState({page:this.state.page+1})
    this.LoadData()
  }

  renderItem = ({ item }) => {
    return (
      <Card key={item.id} elevation={10} style={styles.Hiscontainer}>
        <TouchableWithoutFeedback 
        onPress={()=>this.gotolink(item.link)}
        >
          <Text style={{ 
          fontSize: 25, 
          fontWeight: "bold", 
          color: 'blue' 
          }}>{item.action}</Text>
        </TouchableWithoutFeedback>
        
        <View style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}>
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
            <Text style={{ 
              margin: 5, 
              fontSize: 15, 
              color: 'grey' 
              }}>{item.quantity} Quantity</Text>
            <Text style={{ 
              margin: 5, 
              fontSize: 15, 
              color: 'grey' 
              }}>{item.coins} Coins</Text>
          </View>
          {item.done==0?<View style={{ margin: 5 }}>
            <Text style={{ 
              fontSize: 15, 
              fontWeight: '800', 
              color: 'orange' 
              }}>Pending</Text>
          </View>:<View style={{ margin: 5 }}>
            <Text style={{ 
              fontSize: 15, 
              fontWeight: '800', 
              color: 'green' 
              }}>Completed</Text>
          </View>}
        </View>
      </Card>
    )
  }


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Header title="InstaBuzz"
          onPress={() => this.props.navigation.toggleDrawer()}
          goNotiFy={() => this.props.navigation.navigate('Notify')}
        />
        <Spinner
        visible={this.state.loading}
        textContent={'Loading...'}
        />

        <FlatList
          data={this.state.initialData}
          renderItem={this.renderItem}
          onEndReached={this.handleLoadMore}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Hiscontainer: {
    padding: 10,
    margin: 3
  }
});