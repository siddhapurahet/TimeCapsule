import React from "react";
import { Container, dividerClasses } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import Backgroundvideo from "./components/Background/Background.js";


const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
    <div>
        <Backgroundvideo />

        <BrowserRouter>
            <Container maxwidth="xl">
            <Navbar />
                <Switch>
                    <Route path="/" exact> <Redirect to="/posts" /></Route>
                    <Route path="/posts" exact component={Home} />
                    <Route path="/posts/search" exact component={Home} />
                    <Route path="/posts/:id" exact component={PostDetails} />
                    <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
                </Switch>

            </Container>
        </BrowserRouter>
    </div>
    )
}

export default App;