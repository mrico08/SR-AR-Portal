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
        width: "50%",
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


const Noteform = ({data}) =>(
    <>
    <View style={styles.table}> 
        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>PURPOSE / REPORTED CONCERNS</Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>ACTIONS TAKEN</Text>
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                    {data.purpose || ""}
                </Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                {data.action_taken || ""}
                </Text>
            </View>
        </View>

        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>FINDING/S</Text>
            </View>
            <View style={styles.tableColHeader}>0
                <Text style={styles.tableCell}>NEXT ACTION ITEM / PENDING</Text>
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                    {data.finding || ""}
                </Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                    {data.pending || ""}
                </Text>
            </View>
        </View>

        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>RECOMMENDATION/S</Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>REMARKS</Text>
            </View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                    {data.recommendation || ""}
                </Text>
            </View>
            <View style={styles.tableColHeader}>
                <Text style={styles.tableCell}>
                    {data.remarks || ""}
                </Text>
            </View>
        </View>        
    </View>
    </>
)

export  default Noteform;