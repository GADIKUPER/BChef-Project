import React from 'react'
import { Image, View } from 'react-native'

const ProfileImage = (url) => {
    return <View style={{width: 40, height: 40, borderRadius: 100, overflow: 'hidden'}}>
        <Image style={{marginTop:50,marginLeft:50,width:50,height:50}} source={{uri: url}}/>
    </View>
}

export default ProfileImage