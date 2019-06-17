let appConfig={}

appConfig.port=3000;
appConfig.allowedCorsOrigin="*";
appConfig.env="dev";
appConfig.db={
    uri:"mongodb://test:test@127.0.0.1:27017/blogAppDB"
}
appConfig.apiVersion="/api/vi";

module.exports={
    port:appConfig.port,
    allowedCorsOrigin:appConfig.allowedCorsOrigin,
    enviroment:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion
}