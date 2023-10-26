import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    audioContainer:{
    //   justifyContent:'space-around',
      paddingHorizontal:5,
      paddingVertical:15,
      backgroundColor:'#e2e3e5',
      borderBottomWidth:0.4,
    },
    btn:{
        margin:10,
        backgroundColor:'#626873',
        padding:10,
        borderRadius:10,
        alignSelf: 'center',

    },
    bottomSheet:{
      padding:10,
      backgroundColor:'#626873',
      flexDirection:'row',
      justifyContent:'space-between',
       position:'fixed',
      bottom:0,
      width:'100%',
      alignItems:'center',
    

    },
    bigMusicIcon:{
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#e6dcdc',
      padding:40
    },
    UiContainer:{
      margin:10,
      alignItems:'center',
      justifyContent:'center'
    },
    playBackForward:{
      flexDirection:'row',
      alignItems:'center'
    },
    shuffleContainer:{
      flexDirection:'row',
      alignItems:'center'
    },
    durationContainer:{
      justifyContent:'space-between',
      flexDirection:'row',
      width:'100%',
      paddingHorizontal:15
    }
})

export {styles}