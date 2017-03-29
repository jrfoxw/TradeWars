import React, {Component} from 'react';
import ReactHowler from 'react-howler';
import { Button, Icon, Label } from 'semantic-ui-react';



class MenuOpen extends Component{
  constructor(props){
    super(props);
    this.state = {

      loop: false,
      play: true

    }
  }



  render(){

    const play = () => {
      this.setState({ play:true })
      this.setState({ loop:true })
    }

    const stop = () => {
      this.setState({ loop:false })
      this.setState({ play:false })
    }



    return(
      <div>

        <ReactHowler
          src='./sounds/menu_open.mp3'
          playing={this.state.play}
          volume={0.3}
          loop={this.state.loop}
        />

      </div>
    )
  }
}
export default MenuOpen;
