import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    
let item = [];
const pinformationlist = (data) =>{
    if(Object.keys(data).length>0){
        item = JSON.parse(data.p_information);
    }
}

const Pinformation = ({data}) =>(
    pinformationlist(data),
    <View style={{marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
        <View style={styles.view3}>
            <Text style={styles.text1}>PRODUCT INFORMATION</Text>
        </View>
        <View style={styles.table}> 
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Brand</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>Part Number</Text>
                </View>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Serial Number</Text>
                </View>
            </View>
            {
                item.map((item,i)=>
                    <View style={styles.tableRow} key = {i}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.brand}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{item.partno}</Text>
                        </View>
                        <View style={styles.tableCol2}>
                            <Text style={styles.tableCell}>{item.serial}</Text>
                        </View>
                    </View>                
                )
            }            
        </View>
    </View>
)

export default Pinformation;