import { useContext } from "react";
import BackContext from "../BackContext";

function Sector({sector}) {

   const {setDeleteSector, setModalSector} = useContext(BackContext);

    const handleDelete = () => {
        setDeleteSector(sector)
    }

    const handleEdit =() => {
        setModalSector(sector)
    }

    return (

          <li className="list-item">
            
                <div className="content">
                    <span className="item">{sector.title}</span>
                </div>
                <span className="book-item">
             {sector.muniname} 
        </span>
                <div className="buttons">
                    <button type="button" className="buttons btn2" onClick={handleEdit}>Edit</button>
                    <button type="button" className="buttons btn3" onClick={handleDelete}>Delete</button>
                </div>
            
            </li>
        

    );
}

export default Sector;