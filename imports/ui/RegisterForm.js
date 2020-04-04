import React from 'react'
import { Accounts } from 'meteor/accounts-base'
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000;
  background: #fff;
  border-radius: 3px;
`

function RegisterForm(props){
    registerUser = e => {
        e.preventDefault()
        Accounts.createUser({
            email: this.email.value,
            password: this.password.value
        }, (error) => {
            if(!error){
                props.client.resetStore()
            }
            console.log(error)
        })
    }

    return(
        <form onSubmit={registerUser}>
            <Input type="email" ref={input => this.email = input} />
            <Input type="password" ref={input => this.password = input} />
            <button type="submit">Register User</button>
        </form>
    )
}

export default RegisterForm