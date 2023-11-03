import {createContext} from "react";
import { createTheme } from "@mui/material/styles";

export const theme1= createTheme({
    components: {                
        MUIDataTableBodyRow: {
            styleOverrides: {
                root: {
                    borderColor:'inherit',
                    borderBottom:'1px solid #f0f2f5',
                }
            }                
        },

        // MUIDataTable: {
        //     responsiveBase: {
        //         height: '1px !important',
        //         zIndex: 0,
        //     }
        // },

        MuiTableRow: {
            styleOverrides: {
                root: {
                    '&:hover': {
                      backgroundColor: '#d5e5f2 !important',
                    }
                  }
            }

          },

        MUIDataTableFooter:{
            styleOverrides: {
                root: {

                    borderRadius: "50px",
                    border:'0px',
                }
            }
        },

        MuiPaper: {
            styleOverrides:{
                root: {
                    borderRadius: "15px",
                }
            }
        },

        MuiButtonBase:{
            styleOverrides:{
                root: {
                    fontSize:'.55rem !important',
                    fontWeight:'700!important',
                    fontSize:'.65rem!important',
                }
            }

        },

        MuiTableCell :{
            styleOverrides:{
                root: {
                    borderBottom:"0px",
                    // zIndex: '0 !important',
                    color:'#7B809A',
                    fontFamily:'Roboto,Helvetica,Arial,sans-serif',
                    fontWeight:'600 !important',
                    fontSize:'.75rem!important',
                    lineHeight:1.25,
                    padding:'25px',
                }
            }
        },      
    },
})



const Theme = createContext(theme1);
export default Theme;