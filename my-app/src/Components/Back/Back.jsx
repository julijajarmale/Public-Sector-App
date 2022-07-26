import BackContext from './BackContext';
import MuniCrud from './Municipalities/Crud';
import SectorCrud from './Sectors/Crud';
import Nav from './Nav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';


function Back({show}) {
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    const [municipalities, setMunicipalities] = useState(null)
    const [createMunicipality, setCreateMunicipality] = useState(null)
    const [deleteMunicipality, setDeleteMunicipality] = useState(null)
    const [editMuni, setEditMuni] = useState(null)
    const [modalMuni, setModalMuni] = useState(null)

    const [sectors, setSectors] = useState(null)
    const [createSector, setCreateSector] = useState(null)
    const [deleteSector, setDeleteSector] = useState(null)
    const [editSector, setEditSector] = useState(null)
    const [modalSector, setModalSector] = useState(null)

//READ MUNI
useEffect(() => {
    axios.get('http://localhost:3003/admin/municipalities', authConfig())
        .then(res => setMunicipalities(res.data));
}, [lastUpdate]);

//CREATE MUNICIPALITY

useEffect(() => {
    if (null === createMunicipality) return;
    axios.post('http://localhost:3003/admin/municipalities', createMunicipality, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createMunicipality]);

//DELETE MUNICIPALITY

useEffect(() => {
    if (null === deleteMunicipality) return;
    axios.delete('http://localhost:3003/admin/municipalities/' + deleteMunicipality.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteMunicipality]);

//EDIT MUNICIPALITY

useEffect(() => {
    if (null === editMuni) return;
    axios.put('http://localhost:3003/admin/municipalities/' + editMuni.id, editMuni, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editMuni]);


//READ SECTORS
useEffect(() => {
    axios.get('http://localhost:3003/admin/sectors', authConfig())
        .then(res => setSectors(res.data));
}, [lastUpdate]);

//CREATE SECTORS

useEffect(() => {
    if (null === createSector) return;
    axios.post('http://localhost:3003/admin/sectors', createSector, authConfig())
    .then(res => {
        setLastUpdate(Date.now());
    })
    
}, [createSector]);

//DELETE SECTOR

useEffect(() => {
    if (null === deleteSector) return;
    axios.delete('http://localhost:3003/admin/sectors/' + deleteSector.id, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
    
}, [deleteSector]);

//EDIT SECTOR

useEffect(() => {
    if (null === editSector) return;
    axios.put('http://localhost:3003/admin/sectors/' + editSector.id, editSector, authConfig())
        .then(res => {
            setLastUpdate(Date.now());
        })
       
}, [editSector]);

    return (
        <BackContext.Provider value={{
    municipalities,
    setCreateMunicipality,
    setDeleteMunicipality,
    modalMuni, 
    setEditMuni, 
    setModalMuni,
    sectors,
    setCreateSector,
    setDeleteSector,
    modalSector, 
    setEditSector, 
    setModalSector,
           
        }}>
              {
                show === 'admin' ?
                    <>
                    
                    <Nav/>
                   
            
                    </>
                    : show === 'municipalities' ? <MuniCrud/>: 
                        show === 'sectors' ? <SectorCrud/> : null
            }
        </BackContext.Provider>
    )
}
export default Back;