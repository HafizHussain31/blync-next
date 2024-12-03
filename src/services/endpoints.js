const Endpoints = {
    GET_REPLICATIONS: '/getreplications',
    GET_DASHBOARD: '/getdashboarddata',
    GET_SOURCE_TABLES: '/getmssqltables',
    ADD_REPLICATION: '/addreplication',
    COLLECTION_API: '/getcbcollections'
}


const APIMethods = {
    POST: 'POST',
    GET: 'GET',
    PUT:'PUT',
    DELETE:'DELETE',
    PATCH:'PATCH',
}

const Exported = {
    Endpoints,
    APIMethods
}

export default Exported;


