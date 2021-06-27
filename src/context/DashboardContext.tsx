import * as React from "react";

const { createContext, useState } = React;

interface IDashboardContext {
    setButtonName(name: string): void
    getButtonName(): string
}

const DashboardContext = createContext({} as IDashboardContext);

export const DashboardContextProvider: React.FC = ({ children }) => {

    const  [name, setName] = useState("Name");
    const getButtonName = () => name;

    const setButtonName = (name: string) => {
        setName(name);
    }

    return (
        <DashboardContext.Provider value={{ getButtonName, setButtonName}}> {children} </DashboardContext.Provider>
    );
};

export default DashboardContext;