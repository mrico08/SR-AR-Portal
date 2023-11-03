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
    tableRow2: {
        margin: "auto",
        flexDirection: "row",
    },
    tableRowHeader: {
        flexDirection: "row",
    },
    tableColHeader: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCol: {
        width: "35%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCol2: {
        width: "15%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0 
    },
    tableCell:{
        textAlign: 'left',
        // margin: "auto",
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    },
})

const Crinformation = ({data}) =>{
    return(
        <View style={styles.table}> 
            <View style={styles.tableRow}>0
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>CLIENT INFORMATION</Text>
                </View>
                <View style={styles.tableColHeader}>
                    <Text style={styles.tableCell}>RESELLER INFORMATION</Text>
                </View>
            </View>
            <View style={styles.tableRowHeader}>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Company Name</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.c_cname || ""}</Text>
                </View>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Company Name</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.r_cname || ""}</Text>
                </View> 
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Site Address</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.c_saddress || ""}</Text>
                </View>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Contact Person</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.r_cperson || ""}</Text>
                </View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Contact Person</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.c_cperson || ""}</Text>
                </View>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Contact No.</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.r_contact || ""}</Text>
                </View> 
            </View>
            <View style={styles.tableRow}>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Contact No</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.c_contact}</Text>
                </View>
                <View style={styles.tableCol2}>
                    <Text style={styles.tableCell}>Requested by</Text>
                </View>
                <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{data.r_reported}</Text>
                </View> 
            </View>
        </View>
    )
}

export default Crinformation;