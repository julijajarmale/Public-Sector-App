
import FrontContext from './FrontContext';
import FrontNav from './Nav';
import Create from "./Create"
import { useEffect, useState } from 'react';
import axios from 'axios';

function Front() {
   const [lastUpdate, setLastUpdate] = useState(Date.now());
   const [municipalities, setMunicipalities] = useState(null);
   const [sectors, setSectors] = useState(null);

   const [createProposal, setCreateProposal] = useState(null);
   //const [createComment, setCreateComment] = useState(null);
  



   //READ MUNI
   useEffect(() => {
    axios.get('http://localhost:3003/municipalities')
        .then(res => setMunicipalities(res.data));
}, [lastUpdate]);

//READ Sectors
useEffect(() => {
    axios.get('http://localhost:3003/sectors')
        .then(res => setSectors(res.data));
}, [lastUpdate]);

//CREATE Proposal

useEffect(() => {
    if (null === createProposal) return;
    axios.post('http://localhost:3003/proposals', createProposal)
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createProposal]);

//Create Comment

//// Create
//useEffect(() => {
//    if (null === createComment) return;
//    axios.post('http://localhost:3003/proposals/', createComment)
//        .then(_ => {
//            setLastUpdate(Date.now());
//        })
//}, [createComment]);

        return (
            <FrontContext.Provider value={{
             
            municipalities,
            sectors,
            setCreateProposal,
           // setCreateComment,

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