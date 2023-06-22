import { Typography } from '@mui/material';
import './NothingToShow.css'

function NothingToShow(props)
{
    const variant = props.variant || 'h6';
    const fontWeight = props.fontWeight || "500";
    return(
        // contains some default prop if not passed outside
        <Typography variant={variant} color="grey" sx={{fontFamily:"sans-serif", textAlign : "center" , fontWeight:fontWeight}}>Nothing to show</Typography>
    )
}

export default NothingToShow;