import Resolutions from './resolutions'
import Goals from '../goals/goals'

export default {
    //Server side code (method)
    Query: {
        resolutions(obj, args, { userId }) {
            return Resolutions.find({ 
                userId 
            }).fetch()
        }
    },

    Resolution: {
        goals: resolution => 
            Goals.find({ 
                resolutionId: resolution._id 
            }).fetch(),
        completed: resolution => {
            const goals = Goals.find({ 
                resolutionId: resolution._id
            }).fetch()
            if(goals.length === 0) return false
            const completedGoals = goals.filter(goal => goal.completed)
            return goals.length === completedGoals.length
        }
    },

    Mutation: {
        createResolution(obj, { name }, { userId }) {
            if(userId){
                const resolutionId = Resolutions.insert({
                    name,
                    userId
                })
                return Resolutions.findOne(resolutionId)
            }
            throw new Error("Unauthorized!")
        },
        removeResolution(obj, { _id }) {
            Resolutions.remove(_id)
            const goals = Goals.find({ 
                resolutionId: resolution._id 
            }).fetch()
            Goals.map( goal => {
                if( goals.findOne(goal._id) ) Goals.remove(goal._id)
            })
        },
        updateResolution(obj, { _id, name }) {
            Resolutions.update(_id, {
                $set: { 
                    name 
                },
            })
        }
    }
}