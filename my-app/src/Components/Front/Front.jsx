
import FrontContext from './FrontContext';
import FrontNav from './Nav';
import Create from "./Create"
import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import { authConfig } from '../../Functions/auth';

function Front() {
   const [lastUpdate, setLastUpdate] = useState(Date.now());
   const [municipalities, setMunicipalities] = useState(null);
   const [sectors, setSectors] = useState(null);

    const[proposals, setProposals] = useState(null);
   const [createProposal, setCreateProposal] = useState(null);
   //const [createComment, setCreateComment] = useState(null);
  



   //READ MUNI
   useEffect(() => {
    axios.get('http://localhost:3003/municipalities', authConfig())
        .then(res => setMunicipalities(res.data));
}, [lastUpdate]);

//READ Sectors
useEffect(() => {
    axios.get('http://localhost:3003/sectors',authConfig())
        .then(res => setSectors(res.data));
}, [lastUpdate]);

//CREATE Proposal

useEffect(() => {
    if (null === createProposal) return;
    axios.post('http://localhost:3003/proposals', createProposal, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createProposal]);

//READ Proposals
useEffect(() => {
    axios.get('http://localhost:3003/proposals', authConfig())
        .then(res => setProposals(res.data));
}, [lastUpdate]);



        return (
            <FrontContext.Provider value={{
             
            municipalities,
            sectors,
            setCreateProposal,
            proposals,

            }}>
               <FrontNav/>
               <div className="container">
                    <div className="row">
               <Create/>
            
               </div>
               </div>
               <div className="container">
                    <div className="row">
                <List/>
                    </div>
               </div>
              
            </FrontContext.Provider>
        )
    }
export default Front;