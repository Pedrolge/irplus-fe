import * as React from 'react';
import { FC } from 'react';
import { Card as MuiCard, CardContent } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {FilterList, FilterListItem, useQueryWithStore} from 'react-admin';


const Card = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: -1,
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))(MuiCard);


interface IExperiment {
    id: string,
    name: string
}

const Aside: FC = () => {
    const { loaded, data: experiments } = useQueryWithStore({
        type: 'getList',
        resource: 'experiments',
        payload: {
            filter: {},
            sort: { field: '', order: '' },
            pagination: { page: 1, perPage: 100 },
        },
    });

    let exp: IExperiment[] = experiments

    return <Card>
        <CardContent>
            <FilterList
                label="Experiments"
                icon={<AccessTimeIcon/>}
            >
                {
                    loaded &&
                    exp
                        .map((experiment) => {
                        return <FilterListItem
                            key={experiment.name}
                            label={experiment.name}
                            value={{
                                experiment_id: experiment.id
                            }}
                        />
                    })
                }

            </FilterList>

        </CardContent>
    </Card>
};

export default Aside;
