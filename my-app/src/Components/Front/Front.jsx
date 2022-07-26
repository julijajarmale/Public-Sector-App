
import FrontContext from './FrontContext';
import FrontNav from './Nav';
import Create from "./Create"
import { useEffect, useState } from 'react';
import axios from 'axios';

function Front() {
   const [lastUpdate, setLastUpdate] = useState(Date.now());
   const [municipalities, setMunicipalities] = useState(null);
  



   //READ MUNI
   useEffect(() => {
    axios.get('http://localhost:3003/municipalities')
        .then(res => setMunicipalities(res.data));
}, [lastUpdate]);


        return (
            <FrontContext.Provider value={{
             
            municipalities,

            }}>
               <FrontNav/>
               <div className="container">
                    <div className="row">
               <Create/>
            
               </div>
               </div>
               <div className="container front-container">
                    <div className="row">
               
    
                    </div>
               </div>
              
            </FrontContext.Provider>
        )
    }
export default Front;