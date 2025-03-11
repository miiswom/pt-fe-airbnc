import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export default function Booking({children}) {
console.log(children)
  return (
    <div className="container">
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
    </div>
  )
}