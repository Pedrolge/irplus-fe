import {fetchUtils} from 'react-admin';
import {DataProvider} from "ra-core";

const mlflowPath: string = '2.0/mlflow'
const mlflowPreviewPath: string = '2.0/preview/mlflow'


interface IExperiment {
    id: string,
    name: string,
    artifact_location: string,
    lifecycle_stage: string
}

const BackendDataProvider = (
    apiUrl: string,
    httpClient = fetchUtils.fetchJson,
): DataProvider => ({
    getList: (resource: string, params: any) => {
        switch (resource) {
            case 'experiments':
                return httpClient(`${apiUrl}/${mlflowPath}/${resource}/list?view_type=ALL`)
                    .then(({json}) => {
                            let experiments = json.experiments.map((experiment: any) => {
                                    var new_experiment = {...experiment, id: experiment.experiment_id};
                                    delete new_experiment.experiment_id;
                                    return new_experiment;
                                }
                            );
                            return {
                                data: experiments,
                                total: experiments.length
                            }
                        }
                    )
            case 'runs':
                let experiment_filter = params.filter.experiment_id != null ? [String(params.filter.experiment_id)] : []
                const runOptions = {
                    method: 'POST',
                    body: JSON.stringify({
                        experiment_ids: experiment_filter,
                        filter: "",
                        max_results: 100,
                        run_view_type: "ALL",
                        order_by: []
                    })
                };

                return httpClient(`${apiUrl}/${mlflowPath}/${resource}/search`, runOptions)
                    .then(({json}) => {
                            if (json.runs != null) {
                                let runs = json.runs.map((run: any) => {
                                        return {...run.info, data: run.data, id: run.info.run_id};
                                    }
                                );
                                return {
                                    data: runs,
                                    total: runs.length
                                }
                            } else {
                                return {data: [], total: 0}
                            }

                        }
                    )

            case 'models':
                const modelOptions = {
                    method: 'POST',
                    body: JSON.stringify({filter: "", max_results: 100, order_by: []})
                };

                return httpClient(`${apiUrl}/${mlflowPreviewPath}/registered-models/search`, modelOptions)
                    .then(({json}) => {
                            let models = json.registered_models.map((model: any) => {
                                    return {...model, id: model.name};
                                }
                            );
                            return {
                                data: models,
                                total: models.length
                            }
                        }
                    )
            case 'token':
                return httpClient(`${apiUrl}/auth/${resource}`)
                    .then(({json}) => {
                            let tokens = json.api_keys
                            return {
                                data: tokens,
                                total: tokens.length
                            }
                        }
                    )
            default:
                return new Promise(() => {
                    console.log("GetList default")
                    return {
                        data: [],
                        total: 0
                    }
                })
        }
    },

    getOne: (resource: string, params: any) => {
        switch (resource) {
            case 'experiments':
                return httpClient(`${apiUrl}/${mlflowPath}/${resource}/get?experiment_id=${params.id}`)
                    .then(({json}) => {
                            var experiment = {...json.experiment, id: json.experiment.experiment_id};
                            delete experiment.experiment_id;
                            return {
                                data: experiment
                            }
                        }
                    )
            default:
                console.log(`resource: ${resource} , params: ${params}`)
                return new Promise(() => {
                    console.log("GetOne default")
                    return {
                        data: []
                    }
                })
        }
    },

    getMany: (resource: string, params: any) => {
        switch (resource) {
            case 'experiments':
                return Promise.all(params.ids.map((id: string) => {
                    return httpClient(`${apiUrl}/${mlflowPath}/${resource}/get?experiment_id=${id}`)
                        .then(({json}) => {
                                let experiment: IExperiment = {...json.experiment, id: json.experiment.experiment_id};
                                return experiment
                            }
                        )
                })).then((experiments: any) => {
                    return {
                        data: experiments
                    }
                })
            default:
                console.log(`resource: ${resource} , params: ${params}`)
                return new Promise(() => {
                    console.log("GetMany default")
                    return {
                        data: []
                    }
                })
        }
    },

    getManyReference:
        (resource: string, params: any) => {
            console.log(`resource: ${resource} , params: ${params}`)
            return new Promise(() => {
                console.log("GetManyReference default")
                return {
                    data: [],
                    total: 0
                }
            })
        },

    update:
        (resource: string, params: any) => {
            console.log(`resource: ${resource} , params: ${params}`)
            return new Promise(() => {
                console.log("Update default")
                return {
                    data: []
                }
            })
        },

    updateMany:
        (resource: string, params: any) => {
            console.log(`resource: ${resource} , params: ${params}`)
            return new Promise(() => {
                console.log("UpdateMany default")
                return {
                    data: []
                }
            })
        },

    create:
        (resource: string, params: any) => {
            switch (resource) {
                case "token":
                    const tokenOptions = {
                        method: 'POST',
                        body: JSON.stringify({token_name: params.data})
                    };

                    return httpClient(`${apiUrl}/auth/${resource}`, tokenOptions).then(({json}) => ({
                        data: json.api_key,
                    }))
                default:
                    console.log(`resource: ${resource} , params: ${params}`)
                    return new Promise(() => {
                        console.log("Create default")
                        return {data: {}}
                    })
            }
        },


    delete:
        (resource: string, params: any) => {
            switch (resource) {
                case "token":
                    const tokenOptions = {method: 'DELETE'};

                    return httpClient(`${apiUrl}/auth/${resource}/${params.id}`, tokenOptions).then(({json}) => ({
                        data: json.api_key,
                    }))
                default:
                    return new Promise(() => {
                        console.log("Delete default")
                        return {
                            data: {}
                        }
                    })
            }
        },

    deleteMany:
        (resource: string, params: any) => {
            console.log(`resource: ${resource} , params: ${params}`)
            return new Promise(() => {
                console.log("DeleteMany default")
                return {
                    data: []
                }
            })
        },

})

export default BackendDataProvider