import { useContext } from "react";
import BackContext from "../BackContext";

function BackProposal({ proposal }) {
  const { setDeleteProposal, setApproveProposal } = useContext(BackContext);

  const handleDelete = () => {
    setDeleteProposal(proposal);
  };

  const handleEdit = () => {
    const data = { ...proposal, approved: 1 };
    setApproveProposal(data);
  };

  return (
    <li className="list-item">
      <div className="content">
        <b className="item">{proposal.title}</b>
        <span className="item">{proposal.sector}</span>
        <span className="item">{proposal.muni}</span>
        <span className="item">{proposal.comment}</span>
        <p style={{ color: proposal.approved ? "green" : "red" }}>
          Approved: {proposal.approved ? "Yes" : "No"}
        </p>
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

export default BackProposal;
