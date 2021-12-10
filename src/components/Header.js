import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useHistory } from 'react-router';


export default function Header() {

    const { currentUser } = useAuth();
    const { currentUserSetter } = useAuth();
    const history = useHistory();


    const signOut = () =>{
        if(currentUser){
            auth.signOut().catch((err)=> alert(err));
            currentUserSetter(null);
            history.push('/');
        }
    }

    return (
        <div className="heading">
            {
                currentUser ?
                 <Container>
                     <h1 style={{ "color" : "whitesmoke"}}>Todo</h1>
                     <SignOut>
                        <UserImg src={currentUser.photoURL} alt={currentUser.displayName} />
                        <DropDown>
                        <span onClick={signOut}>Sign out</span>
                        </DropDown>
                    </SignOut>
                </Container> 
                : 
                <Page>
                    <h1 style={{ "color" : "whitesmoke"}}>Todo</h1>
                </Page>
            }
        </div>
    )
}
const Page = styled.div`
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003cff;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;

const Container = styled.div`
    top: 0;
    left: 0;
    right: 0;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #003cff;
    padding: 0 36px;
    letter-spacing: 16px;
    z-index: 3;
`;
//#003cff
const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  color: white;
  background: #758cf0;
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;
const UserImg = styled.img`
  height: 100%;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }
  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;