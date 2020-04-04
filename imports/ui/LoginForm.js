import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: #000;
  background: #fff;
  border: none;
  border-radius: 3px;
`

function LoginForm(props){
    loginUser = e => {
        e.preventDefault()
        Meteor.loginWithPassword(
            this.email.value,
            this.password.value, 
            error => { 
                if(!error){
                    props.client.resetStore()
                }
                console.log(error) 
            }
        )
    }

    return(
        <form onSubmit={loginUser}>
            <Input type="email" ref={input => this.email = input} />
            <Input type="password" ref={input => this.password = input} />
            <button type="submit">Login User</button>
        </form>
    )
}

export default LoginForm