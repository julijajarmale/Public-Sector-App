import { useState } from "react";
import { useContext } from "react";

import FrontContext from "./FrontContext";


function Create() {
 
const {setCreateProposal, municipalities, sectors} = useContext(FrontContext)


const [title, setTitle] = useState("");
const [municipality, setMunicipality] = useState("");
const [sector, setSector] = useState("");
const [comment, setComment] = useState('');



  
const handleCreate = () => {
    const data = { 
      title, 
      municipality: parseInt(municipality),
      sector: parseInt(sector),
      comment
      
     };
    setCreateProposal(data);
    setTitle("");
    setMunicipality("0");
    setSector("0");
    setComment('');
   // setCreateComment({comment, sectorId: sector.id});
    
   
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Add Proposal</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Proposal Subject"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="form-row">
              <label>Select Municipality</label>
              <select
                className="input"
                onChange={(e) => setMunicipality(e.target.value)}
                value={municipality}
              >
                {municipalities
                  ? municipalities.map((municipality) => (
                      <option key={municipality.id} value={municipality.id}>
                        {municipality.name} 
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="form-row">
              <label>Select Sector</label>
              <select
                className="input"
                onChange={(e) => setSector(e.target.value)}
                value={sector}
              >
                {sectors
                  ? sectors.map((sector) => (
                      <option key={sector.id} value={sector.id}>
                        {sector.title} 
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="form-group mt-3">
                    <textarea className="form-control" value={comment} onChange={e => setComment(e.target.value)} rows="3"></textarea>
                </div>
            <button
              type="button"
              className="btn"
              onClick={handleCreate}
            >
              Create
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}

export default Create;