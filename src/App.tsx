import React from 'react';
import './App.css';
import {useKeycloak} from '@react-keycloak/web'
import {
    Admin,
    Resource,
    fetchUtils
} from 'react-admin';
import simpleDataProvider from './services/irplus-service';
import customRoutes from './routes'
import Layout from "./components/Layout";
import ModelList from "./components/ModelList";
import runs from "./components/runs";
import authProvider from "./components/AuthProvider";
import ModelIcon from "./components/icons/ModelIcon"

function App() {

    const { keycloak } = useKeycloak()

    const httpClient = (url: string, options: any = {}) => {
        if (!options.headers) {
            options.headers = new Headers({Accept: 'application/json'});
        }
        options.headers.set('Authorization', `Bearer ${keycloak.token}`);
        return fetchUtils.fetchJson(url, options);
    };
    const dataProvider = simpleDataProvider('http://localhost:3000/api', httpClient);


    return (
        <div className="App">
            {
                (keycloak.authenticated) ? (<div>
                    <Admin
                        dataProvider={dataProvider}
                        customRoutes={customRoutes}
                        authProvider={authProvider(keycloak)}
                        layout={Layout}
                    >
                        <Resource name="runs" {...runs}/>
                        <Resource name="experiments"/>
                        <Resource name="models" list={ModelList} icon={ModelIcon}/>
                    </Admin>
                </div>) : (<div>authenticating...</div>)
            }
        </div>
    );
}

export default App;


