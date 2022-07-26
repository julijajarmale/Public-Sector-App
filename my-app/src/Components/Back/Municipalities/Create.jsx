import { useState } from "react";
import { useRef } from "react";
import { useContext } from "react";
import getBase64 from "../../../Functions/getBase64";

import BackContext from "../BackContext";


function Create() {
 
const {setCreateMunicipality} = useContext(BackContext)

const [name, setName] = useState("");

const fileInput = useRef();
  const [herbas, setHerbas] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
    .then(picture => setHerbas(picture))
    .catch(_ => {
        // tylim
    })
  }
const handleCreate = () => {
    const data = { 
      name, 
      picture: herbas
     };
    setCreateMunicipality(data);
    setName("");
    setHerbas(null);
   
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4 ml-1">
          <form className="form">
            <h2>Add new municipality</h2>
            <div className="form-row">
              <input
                type="text"
                className="input"
                placeholder="Enter Municipality Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>

        
            <div className="form-row">
                    <label>Upload Coat of Arms</label>
                    <input ref={fileInput} type="file" className="input" onChange={doPhoto}/>
                </div>
                {
                    herbas ? <div className="photo-bin"><img src={herbas} alt="nice"/></div> : null
                }
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