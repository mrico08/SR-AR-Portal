import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useEffect,useState } from 'react';

const styles = StyleSheet.create({
    table: { 
        display: "table", 
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopWidth: 0,
    },
    table2: { 
        display: "table", 
        width: "auto",
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
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
    tableCell:{
        margin: "auto",
        marginTop:3,
        marginBottom:3,
        fontSize: 10,
    },
    view1:{
        flex: 1,
        borderStyle: "solid",
    },
    view2:{
        flex: 1,
        borderStyle: "solid",
    },
    view3:{
        textAlign: 'center',
        fontSize: 10,
        border:'1px solid black',
    },
    text1:{
        textAlign: 'left',
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    }
})
    


const Pinformation = ({data}) =>{
    const [item,sitem] = useState([]);
    useEffect(()=>{
        if(Object.keys(data).length>0){
            sitem(JSON.parse(data.p_information));
        }
    },[data])


    return(
        <View style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
        <View style={styles.view3}>
            <Text style={styles.text1}>PRODUCT INFORMATION</Text>
        </View>
        <View style={styles.table}> 
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Business Unit</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Products Involved</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Account Manager</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Sales Unit</Text>
                </View>
            </View>
            {
                item.map((item,i)=>
                    <View key={i} style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.bussiness_unit}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.product_involved}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.account_manager}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.sales_unit}</Text>
                        </View>
                    </View>
                )
            }            
        </View>
    </View>
    )
}

export default Pinformation;