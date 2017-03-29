import React, {Component} from 'react';
import ReactHowler from 'react-howler';



class Audio extends Component{
  constructor(props){
    super(props);
    this.state = {
      newItem: 'test'
    }
  }

  render(){
    return(
      <div>
        {/* <ReactHowler
          src='./sounds/stepSound.mp3'
          playing={true}
          volume={0.5}
          />
        test */}

        />
      </div>
    )
  }
}
export default Audio;
