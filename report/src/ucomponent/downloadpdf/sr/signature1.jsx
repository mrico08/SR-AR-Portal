import { Text, View, StyleSheet,Image } from '@react-pdf/renderer';
import {useState,useEffect,Fragment,useContext} from 'react';
import LocalHost from '../../../portal/context';

const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop:'10px',
        marginLeft:'10px',
        marginRight:'10px',
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "33%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCol2: {
        width: "34%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCol3: {
        width: "34%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        // paddingTop:90
    },
    tableCell:{
        textAlign: 'center',
        // margin: "auto",
        marginTop: 3,
        fontSize: 10,
    },
    tableCell2:{
        textAlign: 'center',
        // margin: "auto",
        marginTop: 95,
        fontSize: 10,
    },
    view1:{
        flex: 1,
        borderStyle: "solid",
    },
})



const Signature = ({data}) =>{
    const local_host = useContext(LocalHost);
    const credential = JSON.parse(localStorage.getItem('credential1'));
    const jwttoken=credential[0];

    const [sign1,ssign1] = useState([]);
    const [sign2,ssign2] = useState(null);
    const [sign3,ssign3] = useState(null);
    const signature1 = async () =>{
        if(Object.keys(data).length>0){
            const sesign = JSON.parse(data.se_sign);
            const conformesign = data.conforme_sign;
            const approversign = data.approver_sign;

            let item ={sesign,conformesign,approversign};
            let response = await fetch('http://'+local_host+'/api/image',{
                method: 'POST',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type":'application/json',
                    "Accept":'application/json',
                    'Authorization': "Bearer " + jwttoken,
                    'X-Requested-With':'XMLHttpRequest',
                }
            });
            
            const {dataUrl1,dataUrl2,dataUrl3} = await response.json();
            ssign1(dataUrl1)
            ssign2(dataUrl2)
            ssign3(dataUrl3)
        }        
    } 

    useEffect(()=>{
        signature1();
    },[data])

    return(
        <View style={{marginBottom:'10px',marginLeft:'10px',marginRight:'10px'}}>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>SERVICE PROVIDED BY</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>CONFORME</Text>
                    </View>
                    <View style={styles.tableCol2}>
                        <Text style={styles.tableCell}>NOTED BY</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        {
                            sign1.length>0  ?
                                sign1.map((item,i)=>{
                                    return(
                                        <Fragment key={i}>
                                        <Image
                                            style={{
                                                maxWidth:'50%',
                                                height:'70px',
                                                marginLeft: 'auto',
                                                marginRight: 'auto',
                                                marginTop: 10,
                                            }}
                                            src={item[1]}
                                        />
                                        <Text style={styles.tableCell}>{item[0] || ""}</Text>
                                        </Fragment>
                                    )
                                })
                            :
                            <Text style={styles.tableCell2}>_______________________________</Text>
                        }
                        <Text style={styles.tableCell}>Technical Engineer/s</Text>
                        <Text style={styles.tableCell}>(Signature and Printed Name)</Text>
                    </View>
                    <View style={styles.tableCol}>
                        {
                            sign2  ?
                            <>
                            <Image
                                style={{
                                    maxWidth:'50%',
                                    height:'70px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 10,
                                }}
                                src={sign2}
                            />
                            <Text style={styles.tableCell}>{data.conforme_name || ""}</Text>
                            </>
                            :
                            <Text style={styles.tableCell2}>_______________________________</Text>
                        }
                        <Text style={styles.tableCell}>Authorized Client Representative</Text>                        
                        <Text style={styles.tableCell}>(Signature over Printed Name)</Text>
                    </View>
                    <View style={styles.tableCol3}>
                        {
                            sign3  ?
                            <>
                            <Image
                                style={{
                                    maxWidth:'50%',
                                    height:'70px',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: 23,
                                }}
                                src={sign3}
                            />
                            <Text style={styles.tableCell}>{data.approver_name || ""}</Text>
                            </>
                            :
                            <Text style={styles.tableCell2}>_______________________________</Text>
                        }
                        <Text style={styles.tableCell}>(Signature over Printed Name)</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Signature;