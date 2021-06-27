

const authProvider = (keycloak: any) => {
    return {
        // authentication
        login: () => { return Promise.resolve(0) },
        logout: () => { return Promise.resolve(keycloak.logout()) },
        checkAuth: () => { return Promise.resolve() },
        checkError: () => { return Promise.resolve() },
        getPermissions: () => { return Promise.resolve() }
    };

}

export default authProvider