
function Proposal({proposal}) {

    const handleDelete = () => {
       
    }

    const handleEdit =() => {
        
    }
    return (

          <li className="list-item">
            
                <div className="content">
                    <b className="item">{proposal.title}</b>
                    <span className="item">{proposal.sector}</span>
                    <span className="item">{proposal.muni}</span>
                    <span className="item">{proposal.comment}</span>
                </div>
                <div className="buttons">
                    <button type="button" className="buttons btn2" onClick={handleEdit}>Aprove</button>
                    <button type="button" className="buttons btn3" onClick={handleDelete}>Delete</button>
                </div>
               
            
            
            </li>
        

    );
}

export default Proposal;