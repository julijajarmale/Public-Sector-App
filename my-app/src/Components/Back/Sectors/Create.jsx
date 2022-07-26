import { useState } from "react";
import { useContext } from "react";
import BackContext from "../BackContext";


function Create() {
 
const {setCreateSector, municipalities} = useContext(BackContext)

const [title, setTitle] = useState("");
const [municipality, setMunicipality] = useState("");


  
const handleCreate = () => {
    const data = { 
      title, 
      municipality: parseInt(municipality),
      
     };
    setCreateSector(data);
    setTitle("");
    setMunicipality("0");
    
   
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Add new sector</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Municipality Name"
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