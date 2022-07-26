import { useContext } from "react";
import BackContext from "../BackContext";

function Muni({muni}) {

   const {setDeleteMunicipality, setModalMuni} = useContext(BackContext);

    const handleDelete = () => {
        setDeleteMunicipality(muni)
    }

    const handleEdit =() => {
        setModalMuni(muni)
    }

    return (

          <li className="list-item">
            
                <div className="content">
                    <span className="item">{muni.name}</span>
                </div>
                <div className="item herbas">
                {
                        muni.herbas ? <div className="photo-bin"><img src={muni.herbas} alt={muni.name} /></div> : null
                    }
                    </div>
                <div className="buttons">
                    <button type="button" className="buttons btn2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="buttons btn3" onClick={handleDelete}>Delete</button>
                </div>
            
            </li>
        

    );
}

export default Muni;