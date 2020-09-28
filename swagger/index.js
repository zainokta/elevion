const authDoc = require('./auth.swagger')
const userDoc = require('./user.swagger')
const allDocs = [
    authDoc.default,
    userDoc.default
]

const apiDoc = {
    openapi: "3.0.0",
    info: {
        version: "1.2.2",
        title: "API Documentation",
        description: "API Doctumentation",
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT",
        },
    },
    servers: [{
        url: "/api/v1",
    }, ],
    authAction: {
        JWT: {
            name: "JWT",
            schema: {
                type: "apiKey",
                in: "header",
                name: "Authorization",
                description: "JWT Auth",
            },
            value: "Bearer <JWT>",
        },
    },
    security: [{
        Bearer: [""],
    }, ],
    paths: {},
    components: {
        securitySchemes: {
            Bearer: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
};

allDocs.forEach((doc) => {
    apiDoc.paths = Object.assign(Object.assign({},apiDoc.paths),doc.paths)
    apiDoc.components.schemas = Object.assign(Object.assign({},apiDoc.components.schemas),doc.schema)
})

exports.default = () => {
    return apiDoc
}
