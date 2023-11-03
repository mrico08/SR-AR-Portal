import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useState,useEffect } from 'react';

const styles = StyleSheet.create({
    table1: { 
        display: "table", 
        width: "auto",
    },
    table2: { 
        display: "table", 
        width: "auto",
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
        borderBottomWidth: 1,
    },
    tableCol: {
        width: "15%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1

    },
    tableCol2: {
        width: "40%",
        borderBottomWidth: 1,
     },
    tableCol3: {
        width: "100%",
        // borderStyle: "solid",
        borderTop: '1px',

    },
    tableCell:{
        textAlign:"center",
        margin: "auto",
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    },
    tableCell3:{
        textAlign:"left",
        margin: "auto",
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    },
    tableCell2:{
        textAlign: 'left',
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    },
    view1:{
        flex: 1,
        borderStyle: "solid",
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    view2:{
        flex: 0.5,
        borderStyle: "solid",
        borderRight: 1,
        borderBottomWidth: 1,
    },
    view3:{
        flex: 0.9,
    },
    view4:{
        flex: 1,
    }
})

const Sinformation = ({data}) =>{
    const array1 = ["Demo","POC","Site Survey","Presentation","Enablement","Pre BID","Design Meeting"];
    const [item,sitem] = useState([]);
    const [tservice,stservice] = useState("");
    const [seinfo,sseinfo] = useState(null);

    const typeservice = (t_activity) =>{
        return(                
                (t_activity !== "" || t_activity !== null) &&
                <> 
                <View style={styles.tableRow}>
                    <View style={styles.tableCol3}>
                        <View style={{display: "flex", flexDirection: "row"}}>
                            <View style={styles.view3}>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Demo" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;DEMO
                                </Text>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="POC" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;POC
                                </Text>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Site Survey" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;SITE SURVEY
                                </Text>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Presentation" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;PRESENTATION
                                </Text>
                            </View>
                            <View style={styles.view4}>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Enablement" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;ENABLEMENT
                                </Text>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Pre BID" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp;PRE BID
                                </Text>
                                <Text style={styles.tableCell3}>
                                    {
                                        t_activity==="Design Metting" ?
                                        <>&#9632;</> :
                                        <>&#9633;</>
                                    }
                                    &nbsp; DESIGN MEETING
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.tableCell2}>
                    {
                        array1.includes(t_activity) ?
                            <>&#9633; Others :</>
                        :
                            <>&#9632; Others : {t_activity}</>
                        
                    }                
                </Text>
                                
                </>                
            )
    }

    useEffect(()=>{
        if(Object.keys(data).length>0){
            stservice(data.t_activity);
            sitem(JSON.parse(data.s_information));
            sseinfo(JSON.parse(data.seinfo));
        }
    },[data])

    return(
        <View style={{display: "flex", flexDirection: "row",marginTop:'10px',marginLeft:'10px',marginRight:'10px'}}>
            <View style={styles.view1}>
                <View style={styles.table1}> 
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}>
                            <Text style={styles.tableCell2}>SERVICE INFORMATION</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Date</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Time IN</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Time OUT</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Break</Text>
                        </View>
                        <View style={styles.tableCol2}>
                            <Text style={styles.tableCell}>Engineer</Text>
                        </View> 
                    </View>

                    {
                        item.map((item,i)=>
                            <View key={i} style={styles.tableRow}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.date}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.timein}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.timeout}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.breakfrom} &ndash; {item.breakto}</Text>
                                </View>
                                <View style={styles.tableCol2}>
                                    <Text style={styles.tableCell}>{seinfo[item.se][1]}</Text>
                                </View> 
                            </View>
                        )
                    }
                </View>
            </View>
            <View style={styles.view2}>
                <View style={styles.table2}> 
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol3}>
                            <Text style={styles.tableCell2}>ACTIVITY TYPE</Text>
                        </View>
                    </View>
                    {typeservice(tservice)}
                    
                </View>
            </View>                
        </View>
    )

}

export default Sinformation;