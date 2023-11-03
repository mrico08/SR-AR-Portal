import {useState,useImperativeHandle,forwardRef} from 'react';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

function Alertnotif({},ref){

    const [data,sdata] = useState(null);
    const openalert = (data) =>{
        sdata(data);
     }

    useImperativeHandle (ref, ()=>({ openalert }));

    return(
        <Stack sx={{ width: '100%' }} spacing={2}>
        {
            (data) && 
            Object.keys(data).map((key,i) => (
                <Alert key={i} onClose={() => sdata(null)} severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    <strong>{data[key][0]}</strong>
                </Alert>
            ))

            
        }
        </Stack>
        
    )
}

export default forwardRef(Alertnotif);