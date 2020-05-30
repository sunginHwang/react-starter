import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

type HomeProps = {}

function Home({}: HomeProps) {

    return (
        <S.Home>
            <p>home Page</p>
            <Link to='/todo'>move todo page</Link>
        </S.Home>
    );
};

export default Home;

const S: any = {};

S.Home = styled.div`
  `;