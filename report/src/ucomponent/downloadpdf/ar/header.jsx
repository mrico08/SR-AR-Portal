import { Text,View,StyleSheet,Image } from '@react-pdf/renderer';

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
        top:5,
        fontSize:15,
        marginTop:30,
        fontWeight: 'bold'
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

const Header  = ({data}) => {
    return(
        <View style={{marginLeft:'10px',marginRight:'10px',marginTop:'1px'}}>
            <View style={{display: "flex", flexDirection: "row"}}>
                <View style={styles.view1}>
                    <Image
                        style={styles.imagelogo}
                        src='http://localhost:3000/mec.png' 
                    />
                    <Text style={styles.text1}>Activity Report</Text>
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
                            Tels (+632) 8422 6822 - (+632) 8422 6888
                        </Text>
                        <Text style={styles.text2}>
                            Email: tcc@mec.ph | Web : www.mec.ph
                        </Text>

                        <View style={{marginTop:'10px'}}>
                            <Text style={styles.text3}>
                                Activity Report No : AR - {data.sr_no || ""}
                            </Text>
                            <Text style={styles.text3}>
                                BOM/Design Ref. No. : {data.designno || ""}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Header;