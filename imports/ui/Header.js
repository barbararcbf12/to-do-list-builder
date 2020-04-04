import React from 'react'
import UserForm from '../ui/UserForm'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: #0E1D44;
    color: #fff;
    box-shadow: 0 0 5px black;
`

const UserBar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 0 15px;
    background-color: #61618B;
    color: #E9DECF;
    height: 30px;
    box-shadow: 0 0 5px black;
`

export default function Header(props) {
    const { user, client } = props

    return (
        <>
            <Wrapper>
                <h1>YOUR TO-DO LIST BUILDER</h1>
                <UserForm user={user} client={client} />
            </Wrapper>
           { user && user._id ? <UserBar>Hi {user.email}!</UserBar> : null }
        </>
    )
}
