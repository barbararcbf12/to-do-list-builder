// import Resolutions from './resolutions'

export default {
    //Server side code (method)
    Query: {
        user(obj, args, { user }) {
            return user || {}
        }
    },
    User: {
        email(obj, args, { user }) {
            if(!user) return null
            return user.emails[0].address
        }
    }
}