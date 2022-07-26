
import { useEffect, useState, useContext } from "react";
import BackContext from "../BackContext";

function Edit() {
  const { municipalities, modalSector, setEditSector, setModalSector } =
    useContext(BackContext);

  const [title, setTitle] = useState("");
  const [municipality, setMunicipality] = useState('');
  

  

  useEffect(() => {
    if (null === modalSector) {
      return;
    }

    setTitle(modalSector.title);
    setMunicipality(municipalities.filter((m) => m.title === modalSector.municipality)[0].id);
   
  }, [modalSector, municipalities]);

  const handleEdit = () => {
  

    const data = {
      title,
      id: modalSector.id,
      municipality: parseInt(municipality),
     
    };
console.log('data', data)
    setEditSector(data);
    setModalSector(null);
  };

  if (null === modalSector) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Edit Sector Information</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalSector(null)}
        >x</button>
      </div>
      <div className="form modal-body">
        <div className="form-row">
          <label>Update Sector Title:</label>
          <input
            type="text"
            className="input"
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
            <option value="0">Select Author</option>
            {municipalities
              ? municipalities.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} 
                  </option>
                ))
              : null}
          </select>
        </div>
       
      <div className="buttons">
        <button
          type="button"
          className="btn btn2"
          onClick={() => setModalSector(null)}
        >
          Close
        </button>
        <button type="button" className="btn btn3" onClick={handleEdit}>
          Save changes
        </button>
      </div>
    </div>
    </div>
    
  );
}

export default Edit;
