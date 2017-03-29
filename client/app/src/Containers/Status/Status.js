import React, {Component} from 'react';
import Theme from '../../Components/Audio/ambient/dungeon_theme';


class Status extends Component{
  constructor(props){
    super(props);
    this.state = {
      status: 'no server connected.. Standby..'
    }
  }



componentWillMount(){
  if(!this.props.socket.connected){
    console.log('Socket Dropped!')
    this.setState({status: "server disconnected ..standby.."})
  }
  this.checkStatus()

  this.props.socket.on('connection :: status', (data) =>{
    console.debug('Connection status: ',data)
    setTimeout(() =>{
        this.setState({status: data })
    },300)

  })
}

checkStatus(){
  setInterval(() =>{
    if(!this.props.socket.connected){
      this.setState({ status: <span style={{ color: "red" }}>disconnected..standby</span>})
    }else{
      this.setState({ status: "connected"})
    }
  })


}


  render(){



    return(
      <div>
        <div style={{ width: "700px", height: "100px", padding: "15px",backgroundColor: "black", color:"orange"}}> Status :: <span style={{ color: 'white'}}> {this.state.status} </span>
          <Theme play={false}/>
        </div>
      </div>
    )
  }

}
export default Status;
