import React,{Component} from 'react'; 
import { StyleSheet,View,Image,Text,Animated,Easing} from 'react-native';
import Bchef from '../assets/Images/Bchef.png'
export default class BchefRotation extends Component{
  state = {
      spinValue: new Animated.Value(0)
  }
  
    StartImageRotationFunction=()=>{
        this.spinValue.setValue(0)
        Animated.timing(this.state.spinValue,{
            toValue: 1,
            duration: 3000
           
        }).start()
        
    }
    render(){
        const spinData = this.state.spinValue.interpolate({
            inputRange:[0,360],
            outputRange:['0deg','360deg']
        })
        return(
           <View style={{flex:1}}>
              <Animated.View style={{transform:[{rotate:spinData}]}}>
              <Image source={Bchef} style={{width:300,height:250,marginTop:150}}/>
              </Animated.View>
           </View>
        )
    }
}