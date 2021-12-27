import React from 'react';
import { View } from 'react-native';

import { WebView } from 'react-native-webview';

const ForgotPassword=(props)=> {

  // Send Email with Email of Admin to reset Password with server
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: ' win5239.site4now.net/rup_proj5/SendResetPasswordEmail' }} style={{ marginTop: 20 }} />
            </View>
        )
    
}
export default  ForgotPassword