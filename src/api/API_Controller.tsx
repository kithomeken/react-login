function API_Controller () {
    let FQDN = null
    let API = null

    if (process.env.NODE_ENV === 'production') {
        FQDN = 'https://beska.kennedykitho.me' 
        API = 'https://beska.kennedykitho.me/api' 
    } else {
        FQDN = 'http://localhost:81/beska_/public'
        API = 'http://localhost:81/beska_/public/api'
    }

    return {
        'FQDN': FQDN,
        'API': API,
    }
}

export const FULLY_QUALIFIED_DOMAIN_NAME = API_Controller().FQDN
export const API_DOMAIN = API_Controller().API
// export const API_MEDIA_DOMAIN_PREFIX = API_Controller().MEDIA_API_DOMAIN
