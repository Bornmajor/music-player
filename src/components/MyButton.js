import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { styles } from '../styles/styles'

//predefine component btn

const MyButton = ({title,fn}) => {
  return (
 <Pressable style={styles.btn} onPress={() => fn()} >
    <Text style={{textAlign:'center',fontSize:18,color:'white'}}>{title}</Text>
 </Pressable>
  )
}

export default MyButton