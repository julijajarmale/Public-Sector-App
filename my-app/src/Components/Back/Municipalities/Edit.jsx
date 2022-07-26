import { useEffect, useState, useContext, useRef } from "react";
import getBase64 from "../../../Functions/getBase64";
import BackContext from "../BackContext";

function Edit() {
  const { modalMuni, setEditMuni, setModalMuni } =
    useContext(BackContext);

  const [name, setName] = useState("");
  const fileInput = useRef();
  const [herbas, setHerbas] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((picture) => setHerbas(picture))
      .catch((_) => {
        // tylim
      });
  };

  useEffect(() => {
    if (null === modalMuni) {
      return;
    }

    setName(modalMuni.name);
    setHerbas(modalMuni.herbas);
  }, [modalMuni]);

  const handleEdit = () => {
    console.log("suveike");
    const data = {
      name,
      picture: herbas,
      id: modalMuni.id,
    };

    setEditMuni(data);
    setModalMuni(null);
  };

  if (null === modalMuni) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-header">
        <h2 className="modal-title">Edit Municipality Information</h2>
        <button
          type="button"
          className="close"
          onClick={() => setModalMuni(null)}
        ></button>
      </div>
      <div className="modal-body">
        <div className="form-row">
          <label>Update Name</label>
          <input
            type="text"
            className="input"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        
        <div className="form-row">
          <label>Add new Photo</label>
          <input
            ref={fileInput}
            type="file"
            className="input"
            onChange={doPhoto}
          />
        </div>
        <div>
          {herbas ? (
            <div className="herbas">
              <img src={herbas} alt="nice" />
            </div>
          ) : null}
        </div>
        <div className="buttons">
          <button
            type="button"
            className="btn btn2"
            onClick={() => setModalMuni(null)}
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
