
import { useContext, useState } from 'react';
import FrontContext from './FrontContext';

function SortFilter() {

    const [sortBy, setSortBy] = useState('default');
    const {  proposals, setProposals, doFilter, proposal, setSearch} = useContext(FrontContext);

    const [s, setS] = useState('');

    

    
    const doSearch = e => {
        setS(e.target.value);
        setSearch(e.target.value);
    }


    const doSort = e => {
        setSortBy(e.target.value);
        const p = [...proposals]
        switch (e.target.value) {
            case 'ascTitle':
                p.sort((a, b) => {
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                });
                break;
            case 'descTitle':
                p.sort((a, b) => {
                    if (a.title > b.title) return -1;
                    if (a.title < b.title) return 1;
                    return 0;
                });
                break;
           
            default:
                p.sort((a, b) => a.row - b.row);
        }
        setProposals(p);
    }

    return (
        <div className="card mt-4">
            <div className="card-header">
                <h2>Sort and Filter</h2>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                <label>Sort By</label>
                                <select className="form-control" value={sortBy} onChange={doSort}>
                                    <option value="default">Default Sort</option>
                                    <option value="ascTitle">Title A-Z</option>
                                    <option value="descTitle">Title Z-A</option>
                                  
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label>Filter by Categories</label>
                                <select className="form-control" onChange={e =>doFilter(e.target.value)} value={proposal}>
                                    <option value="0">All Cats</option>
                                    {
                                        proposals ? proposals.map(p => <option key={proposal.id} value={p.id}>{p.title}</option>) : null
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label>Search</label>
                                <input className="form-control" type="text" value={s} onChange={doSearch} />
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortFilter;