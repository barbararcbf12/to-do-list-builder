import React from 'react'
import RegisterForm from '../ui/RegisterForm'
import LoginForm from '../ui/LoginForm'
import LogOutIcon from '@material-ui/icons/MeetingRoom'
import styled from 'styled-components'

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 5px;
    color: #fff;
    background: transparent;
    border: none;
    border-radius: 3px;
`

export default function UserForm(props) {
    const { user, client } = props
    
    return user && user._id ? (
        <>
            <StyledButton onClick={() => {
                Meteor.logout()
                client.resetStore()
            }}>
                <LogOutIcon fontSize="large" style={{ color: '#fff' }} />
            </StyledButton>
        </>
    ) : (
        <div>
            <LoginForm client={client} />
            <RegisterForm client={client} />
        </div>
    )
        
}
