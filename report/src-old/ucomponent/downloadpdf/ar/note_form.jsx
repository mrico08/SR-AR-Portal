import { Text, View, StyleSheet } from '@react-pdf/renderer';

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
    tableRowHeader: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCell:{
        textAlign: 'left',
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        marginRight:5,
        fontSize: 10,
    }
})


const Noteform = ({data}) =>{
     return(
        <>
        <View style={styles.table}> 
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>ACTIVITY DESCRIPTION</Text>
                </View>            
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>
                        {data.a_description}
                    </Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>ACTIVITY ASSESSMENT</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>NEXT ACTION ITEM / PENDING</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                        {data.a_assessment || ""}
                    </Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>
                        {data.pending || ""}
                    </Text>
                </View>
            </View>
        </View>

        <View style={styles.table}> 
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>POTENTIAL UPSELL / REMARKS</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>
                        {data.remarks}
                    </Text>
                </View>
            </View>
        </View>
        </>
    )
}
    

export  default Noteform;