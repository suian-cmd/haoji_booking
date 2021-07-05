import React from 'react';
import {HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import styled from "styled-components";
import Home from "./views/Home";
import Detail from "./views/Detail";
import NoMatch from "./views/NoMatch";
import Money from "./views/Home/Money";
import Edit from "./views/Home/Money/Edit";
import EditTag from "./views/Home/Money/Edit/EditTag";
import Statistics from "./views/Statistics";



const AppWrapper = styled.div`
  height: 100%;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width:450px){
    background-color: #ffffff;
    border: 1px solid #e3e3e4;
  }
`

function App() {
  return (
    <AppWrapper>
        <Router>
            <Switch>
                <Route exact path={`/home/money/edit/:id`} component={EditTag}/>
                <Route exact path={`/home/money/edit/:id&mold`} component={EditTag}/>
                <Route exact path={`/home/money/:edit`} component={Edit}/>
                <Route exact path={`/home/money`} component={Money}/>
                <Route exact path={'/home'} component={Home}/>
                <Route exact path={'/detail'} component={Detail}/>
                <Route exact path={'/statistics'} component={Statistics}/>
                <Redirect exact from={'/'} to={'/home'}/>
                <Route path={'*'} component={NoMatch}/>
            </Switch>
        </Router>
    </AppWrapper>
  );
}

export default App;
