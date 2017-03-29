import React, {Component} from 'react';
import ReactHowler from 'react-howler';
import { Button, Icon, Label } from 'semantic-ui-react';



class Audio extends Component{
  constructor(props){
    super(props);
    this.state = {

      loop: false,
      play: this.props.play,

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
      <div style={{padding: "5px", backgroundColor: "black", border: "2px solid gray", boxShadow:"2px 3px 4px black" , color:"white"}}>


        <ReactHowler
          src='./sounds/ambient_score.mp3'
          playing={this.state.play}
          volume={0.3}
          loop={this.state.loop}
        />


        <Label size="small" pointing="right">
          <Icon name='music'/>

        </Label>
        <Button icon onClick={play} size="tiny">
          <Icon name='play' size="tiny" corner/>
        </Button>
        <Button onClick={stop} size="tiny">
          <Icon name='pause' size="tiny" corner/>
        </Button>

      </div>
    )
  }
}
export default Audio;
