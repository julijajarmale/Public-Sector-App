import { useState } from "react";
import { useContext } from "react";
import BackContext from "../BackContext";

function Proposal({proposal}) {

    const { setDeleteProposal, setEditProposal } = useContext(BackContext);

    const [aproved, setAproved] = useState(false);

   

    const handleDelete = () => {
        setDeleteProposal(proposal)
    }

    const aprove = () => {
        setEditProposal(proposal)
        console.log("suveike");
        const data = {
        
          aproved: aproved ? 1 : 0,
        
        };
        console.log(data);
        setAproved(data);
       
      };



    return (

          <li className="list-item">
            
                <div className="content">
                    <b className="item">{proposal.title}</b>
                    <span className="item">{proposal.sector}</span>
                    <span className="item">{proposal.muni}</span>
                    <span className="item">{proposal.comment}</span>
                    
                    <span className="item">
          {proposal.aproved ? (
            <div className="aproved">Aproved</div>
          ) : (
            <div className="notaproved">Not aproved</div>
          )}
        </span>
                </div>
                <div className="buttons">
                    <button type="button" className="buttons btn4" onClick={aprove}>Aprove</button>
                    <button type="button" className="buttons btn3" onClick={handleDelete}>Delete</button>
                </div>
               
            
            
            </li>
        

    );
}

export default Proposal;