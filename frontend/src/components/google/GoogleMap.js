import React, { useState } from 'react'
import { REACT_APP_GG_APIKEY, REACT_APP_MAPID } from '../../constants/constants.js';
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    InfoWindow
} from '@vis.gl/react-google-maps';


const GoogleMap = ({position}) => {

    const [open, setOpen] = useState(false);

    return (
        <APIProvider apiKey={REACT_APP_GG_APIKEY}>
            <div style={{height: "600px", width: "1000px"}}>
                <Map zoom={16} center={position} mapId={REACT_APP_MAPID}>
                    <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                        <Pin borderColor={"yellow"}/>
                    </AdvancedMarker>
                    {
                        open && 
                        <InfoWindow 
                            position={position} 
                            onCloseClick={()=> setOpen(false)}
                        >
                                This is my home
                        </InfoWindow>}
                </Map>
            </div>
            
        </APIProvider>
    )
}

export default GoogleMap;