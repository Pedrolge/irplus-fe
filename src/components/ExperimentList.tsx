import React from "react";
import { Datagrid, List, TextField } from "react-admin";




const ExperimentList = (props: any) => (
    <List {...props} bulkActionButtons={false}>
            <Datagrid>
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="artifact_location" />
                <TextField source="lifecycle_stage" />
            </Datagrid>
    </List>
);

export default ExperimentList