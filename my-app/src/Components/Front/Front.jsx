
import FrontContext from './FrontContext';
import FrontNav from './Nav';
import Create from "./Create"
import { useEffect, useState } from 'react';
import axios from 'axios';
import List from './List';
import { authConfig } from '../../Functions/auth';
import SortFilter from './SortFilter';

function Front() {
   const [lastUpdate, setLastUpdate] = useState(Date.now());
   const [municipalities, setMunicipalities] = useState(null);
   const [sectors, setSectors] = useState(null);

    const[proposals, setProposals] = useState(null);
   const [createProposal, setCreateProposal] = useState(null);
   
   const [proposal, setProposal] = useState(0);
   const [filter, setFilter] = useState(0);
   const [search, setSearch] = useState('');

   const doFilter = cid => {
    setProposal(cid);
    setFilter(parseInt(cid));
}

useEffect(() => {
    let query;
    if (filter === 0 && !search) {
        query = '';
    } else if (filter) {
        query = '?proposal-id=' + filter
    } else if (search) {
        query = '?s=' + search
    }


    //axios.get('http://localhost:3003/proposals' + query, authConfig())
    //    .then(res => {
    //        const proposals = new Map();
    //        res.data.forEach(p => {
    //            let sector;
    //            if (null === p.sector) {
    //                sector = null;
    //            } else {
    //                sector = {id: p.sector_id, sector: p.sector};
    //            }
    //            if (proposals.has(p.id)) {
    //                const pr = proposals.get(p.id);
    //                if (sector) {
    //                    pr.com.push(sector);
    //                }
    //            } else {
    //                proposals.set(p.id, {...p});
    //                const pr = proposals.get(p.id);
    //                pr.sector = [];
    //                delete pr.sector_id;
    //                if (sector) {
    //                    pr.sector.push(sector);
    //                    
    //                }
    //            }
    //        });
    //        
    //        console.log([...proposals].map(e => e[1]));
    //        setProposals([...proposals].map(e => e[1]).map((p, i) => ({ ...p, row: i })));
    //    })
//
//}, [filter, search, lastUpdate]);

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
            setProposals,
            setMunicipalities,
            setSectors,
            setFilter,
            proposal,
            doFilter,
            setSearch,

            }}>
               <FrontNav/>
               <div className="container">
                    <div className="row">
               <Create/>
            
               </div>
               </div>
               <div className="container">
               <div className="row">
                    <div className="col-12">
                        <SortFilter />
                    </div>
                    <div className="row">
                <List/>
                    </div>
               </div>
               </div>
            </FrontContext.Provider>
        )
    }
export default Front;