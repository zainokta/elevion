const tag = 'User'
const schema = {
    UserProfile: {
        title: 'User Profile',
        properties: {
            name: {
                type: 'string'
            },
            email: {
                type: 'string'
            },
            gender: {
                type: 'string'
            }
        }
    }
}

const paths = {
    '/users': {
        get:{
            tags: [tag],
            responses: {
                200: {
                    description: 'Get User Profile',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: "#/components/schemas/UserProfile"
                            }
                        }
                    }
                }
            }
        }
    }
}

exports.default = {
    schema,
    paths
}