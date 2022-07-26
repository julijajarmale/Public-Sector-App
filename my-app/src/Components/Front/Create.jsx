import { useState } from "react";
import { useContext } from "react";

import FrontContext from "./FrontContext";


function Create() {
 
const {setCreateProposal, municipalities} = useContext(FrontContext)


const [title, setTitle] = useState("");
const [municipality, setMunicipality] = useState("");


  
const handleCreate = () => {
    const data = { 
      title, 
      municipality: parseInt(municipality),
      
     };
    setCreateProposal(data);
    setTitle("");
    setMunicipality("0");
    
   
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