import { Text, View, StyleSheet } from '@react-pdf/renderer';

import React,{useState} from 'react';

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
        width: "30%",
        borderBottomWidth: 1,
     },
    tableCol3: {
        width: "100%",
        // borderStyle: "solid",
        borderTop: '1px',
    },
    tableCol4: {
        width: "25%",
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderRightWidth: 1

    },
    tableCell:{
        textAlign: "center",
        margin: "auto",
        marginTop:3,
        marginBottom:3,
        marginLeft:5,
        fontSize: 10,
    },
    tableCell3:{
        textAlign: "left",
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
        flex: 0.5,
    },
    view4:{
        flex: 1,
    }
})



let item = [];
let seinfo = null;
let t_service = "";
const pinformation = (data) =>{
    if(Object.keys(data).length>0){
        item = JSON.parse(data.s_information);
        seinfo = JSON.parse(data.seinfo);
        t_service = data.t_service;
    }
}

const array1 = ["New","Continuation","In Wty","Out Wty","Project","Corrective Maintenance","Preventive Maintenance","On Cell"];

const typeofservice = (item1) =>{    
    return(
        <>
        <View style={styles.tableRow}>
            <View style={styles.tableCol3}>
                <View style={{display: "flex", flexDirection: "row"}}>
                    <View style={styles.view3}>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="New" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                            &nbsp;New
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="Continuation" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                            &nbsp;Continuation
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="In Wty" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                             &nbsp;In Wty
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="Out Wty" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }           
                            &nbsp;Out Wty             
                        </Text>
                    </View>
                    <View style={styles.view4}>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="Project" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                            &nbsp;Project
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="Corrective Maintenance" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                            &nbsp;Corrective Maintenance
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="Preventive Maintenance" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                             Preventive Maintenance
                        </Text>
                        <Text style={styles.tableCell3}>
                            {
                                item1==="On Cell" ?
                                <>&#9632;</> :
                                <>&#9633;</>
                            }
                            On Cell
                        </Text>
                    </View>
                </View>
            </View>
        </View>
        <Text style={styles.tableCell3}>
            {
                array1.includes(item1) ?
                    <>&#9633; Others :</>
                :
                    <>&#9632; Others : {item1}</>
                
            }

        </Text>
        </>
    )
    
}


const Sinformation = ({data}) =>(
    pinformation(data),


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
                    <View style={styles.tableCol4}>
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
                                    <Text style={styles.tableCell}>{item && item.date}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.timein}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.timeout}</Text>
                                </View>
                                <View style={styles.tableCol4}>
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
                        <Text style={styles.tableCell2}>Type of Service</Text>
                    </View>
                </View>
                {typeofservice(t_service)}                
            </View>
        </View>                
    </View>

)

export default Sinformation;