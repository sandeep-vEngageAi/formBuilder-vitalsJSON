import React from 'react'
import SearchableComponent from '../UI/SearchDropdown/SearchableComponent';
import vEngageLogo from '../../Icons/transparentVEngageLogo.png';
const LayoutHeader = () => {
    return (
        <div className="layoutHeader__container" onClick={()=>window.location.reload()} style={{cursor:"pointer"}}>
            <img className="layoutHeader__image" src={vEngageLogo} style={{height:"50px",objectFit:"contain"}} />
        </div>
    )
}

export default LayoutHeader
