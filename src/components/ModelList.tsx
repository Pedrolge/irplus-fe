import React, {FC} from "react";
import {ArrayField, ChipField, Datagrid, List, SingleFieldList, TextField, useRecordContext} from "react-admin";


interface IProps {
    source: string
}

const DateTextField: FC<IProps> = ({ source }) => {
    const record = useRecordContext();
    return (
        <div>{new Date(parseInt(record[source])).toLocaleString()}</div>
    );
};

const ModelList = (props: any) => (
    <List {...props} bulkActionButtons={false}>
        <Datagrid>
            <TextField source="id" label={"Name"}/>
            <DateTextField source="creation_timestamp" />
            <DateTextField source="last_updated_timestamp" />
            <ArrayField source="latest_versions"><SingleFieldList><ChipField source="name" /></SingleFieldList></ArrayField>
        </Datagrid>
    </List>
);

export default ModelList