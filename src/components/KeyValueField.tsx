import React from "react";
import {useRecordContext} from "react-admin";
import Chip from '@material-ui/core/Chip';


const KeyValueField = () => {
    const record = useRecordContext();
    return (
        <div>
            <Chip label={`${record.key}: ${record.value}`}/>
        </div>
    );
};

export default KeyValueField
