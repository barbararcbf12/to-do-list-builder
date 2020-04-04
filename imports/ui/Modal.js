import React from 'react'
import styled from 'styled-components'
import { animated, useTransition } from 'react-spring'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'

const ModalWrapperContainer = styled.div`
    z-index: 999;
`

const ModalContainer = styled.div`
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    z-index: 1;
    z-index: 998;
    background-color: rgba(0, 0, 0, .75);
`

const ModalDiv = styled.div`
    width: 50%;
    padding: 2%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: #fff;
`

const StyledButton = styled.button`
    padding: 0.65em;
    font-size: 5px;
    color: #fff;
    border: none;
    border-radius: 3px;
    background-color: #93876b;
    margin: 20px;
    outline: none;
`

export function Modal({element, handleRemove, closeModal, animation, pointerEvents}) {
    return (
        // <ModalContainer style={{ pointerEvents }}>
            <ModalDiv style={{ pointerEvents }}>
                <animated.div className="modal-card" style={animation}>
                    <p>You are about to delete the item:</p>
                    <h1>{element.name}</h1>
                    <p>Do you confirm the operation?</p>
                    <StyledButton onClick={handleRemove} style={{backgroundColor: "#00FF00"}}><ThumbUpIcon fontSize="large" /></StyledButton>
                    <StyledButton onClick={closeModal} style={{backgroundColor: "#FF0000"}}><ThumbDownIcon fontSize="large" /></StyledButton>
                </animated.div>
            </ModalDiv>
        // </ModalContainer>
    )
}

export default function ModalWrapper(props) {
    const { element, handleRemove, on, setOpenModal } = props
    const transition = useTransition(on, null, {
        from: { opacity: 0, transform: 'translated3d(0,-40px,0)' },
        enter: { opacity: 1, transform: 'translated3d(0,0px,0)' },
        leave: { opacity: 0, transform: 'translated3d(0,-40px,0)' },
    })
    const pointerEvents = on ? 'all' : 'none'
    
    return (
        <ModalContainer>
            {transition.map(({item, key, props: animation}) => 
                item && (
                    <Modal 
                        key={element._id}
                        element={element} 
                        handleRemove={() => handleRemove(element._id)} 
                        pointerEvents={pointerEvents} animation={animation} 
                        closeModal={() => setOpenModal(false)}
                    />
                )
            )}
        </ModalContainer>
    )
}
