import {useContext} from 'react';
import { Text,View,StyleSheet,Image } from '@react-pdf/renderer';
import LocalHost from '../../../portal/context';

const styles = StyleSheet.create({
    layout: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    imagelogo: {
        width:'40%',
    },
    
    // text
    text1:{
        marginTop:40,
        fontSize:15,
    },
    text2:{
        top:5,
        fontSize:8,
        paddingBottom:3
    },
    text3:{
        top:5,
        fontSize:10,
        paddingBottom:3
    },

    // view
    view1:{
        // position:'absolute',
        flex: 1,
    },
    view2:{
        flex: 0.4,
        // textAlign: "right"
        // position:'absolute',
        // float:'right',
    }
});

const Header = ({data}) =>{
    const local_host = useContext(LocalHost);

    return(
        <View style={{marginLeft:'10px',marginRight:'10px',marginTop:'1px'}}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <View style={styles.view1}>
                    <Image
                        style={styles.imagelogo}
                        src='../mec.png'
                    />
                    <Text style={styles.text1}>SERVICE REPORT</Text>
                </View>
                <View style={styles.view2}>
                    <View>
                        <Text style={styles.text2}>
                            307 @MEC Centre P.Tuazon Blvd cir 21st Ave,
                        </Text>
                        <Text style={styles.text2}>
                            Cubao Quezon City, 1106 Philippines
                        </Text>
                        <Text style={styles.text2}>
                            Tels (+632) 422 6822 - (+632) 422 6888
                        </Text>
                        <Text style={styles.text2}>
                            Email: tcc@mec.ph | Web : www.mec.ph
                        </Text>

                        <View style={{marginTop:'10px'}}>
                            <Text style={styles.text3}>
                                SR No : SR-{data.sr_no || ""}
                            </Text>
                            <Text style={styles.text3}>
                                Project / SA No : {data.project || ""}
                            </Text>
                            <Text style={styles.text3}>
                                Case No. : {data.caseno || ""}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}


export default Header;