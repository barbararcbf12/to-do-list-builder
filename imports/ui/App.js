import React from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import {flowRight as compose} from 'lodash'
import { withApollo } from 'react-apollo'
import styled from 'styled-components'
import Header from '../ui/Header'
import ResolutionForm from './Resolution/ResolutionForm'
import Resolution from './Resolution/Resolution'

export const CardGrid = styled.div`
    display: grid;
    padding: 2rem 2rem;
    grid-template-columns: repeat(5, 1fr);
    grid-row-gap: 1rem;
    grid-column-gap: 1rem;
    min-height: 0;  /* NEW */
    min-width: 0;   /* NEW; needed for Firefox */

    @media only screen 
        and (max-width : 1240px) {
        padding: 1rem 2rem;
        grid-template-columns: repeat(4, 1fr);
    }

    @media only screen 
        and (max-width : 1024px) {
        padding: 1rem 2rem;
        grid-template-columns: repeat(3, 1fr);
    }
`

function App({ loading, resolutions, client, user, refetch }){

    if(loading) return null
    return (
        <div>
            <Header user={user} client={client} />
            
            { user && user._id && 
                <>
                    <CardGrid>
                        <ResolutionForm /> 
                        {resolutions.map(resolution => (
                            <Resolution key={resolution._id} resolution={resolution} refetch={refetch} />
                        ))}
                    </CardGrid>
                </>
            }
        </div>
    )
}

const resolutionsQuery = gql`
    query Resolutions{
        resolutions{
            _id
            name
            completed
            goals{
                _id
                name
                completed
            }
        }
        user{
            _id
            email
        }
    }
`

export default compose(
    withApollo,
    graphql(resolutionsQuery, {
        props: ({ data }) => ({ ...data })
    })
)(App)