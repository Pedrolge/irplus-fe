import {
    List,
    Datagrid,
    TextField,
    ListProps,
    SingleFieldList,
    ArrayField,
} from "react-admin";
import React, {FC} from "react";
import RunsListAside from "./RunsListAside";
import KeyValueField from "../KeyValueField";



const RunsList: FC<ListProps> = ((props: ListProps) => {
    return (
        <div>
            <List {...props}
                empty={false}
                  bulkActionButtons={false}
                  aside={<RunsListAside/>}
            >
                <Datagrid optimized>
                    <TextField source="id" />
                    <TextField source="status"/>
                    {/*<TextField source="start_time" />*/}
                    {/*<TextField source="end_time" />*/}
                    <TextField source="lifecycle_stage"/>
                    <ArrayField source="data.metrics">
                        <SingleFieldList>
                            <KeyValueField/>
                        </SingleFieldList>
                    </ArrayField>
                    <ArrayField source="data.params">
                        <SingleFieldList>
                            <KeyValueField/>
                        </SingleFieldList>
                    </ArrayField>


                </Datagrid>
            </List>
        </div>
    );
});

export default RunsList