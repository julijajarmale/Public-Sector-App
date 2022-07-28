
import { useState } from "react";
import { useContext} from "react";
import BackContext from "../BackContext";

function Proposal({ proposal }) {

  const { setDeleteProposal, setEditProposal } = useContext(BackContext);

  const [aproved, setAproved] = useState(false)


  const handleEdit = () => {
    const data = {...proposal, aproved: aproved? 1:0};
    setEditProposal(data)
    setAproved()
    console.log(proposal);
  }
  const handleDelete = () => {
  
    setDeleteProposal(proposal);
    console.log('suveike')
    
  }

  return (
    <li className="list-item">
      <div className="content">
        <b className="item">{proposal.title}</b>
        <span className="item">{proposal.sector}</span>
        <span className="item">{proposal.muni}</span>
        <span className="item">{proposal.comment}</span>
        <p style={{color: proposal.aproved ? 'green' : 'red'}}>Approved: {proposal.aproved ? 'Yes' : 'No'}</p>
      
      </div>
      <div className="buttons">
        <button type="button" className="buttons btn4" onClick={handleEdit}>
          Approve
        </button>
        <button type="button" className="buttons btn3" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default Proposal;
