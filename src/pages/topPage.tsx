import React, { FC } from 'react';
import TopHeader from '../components/topPage/topHeader';
import TopMain from '../components/topPage/topMain';
import ResultPage from './resultPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ImageItemList from '../components/resultPage/resultImageList';
import DownloadPage from './downloadPage';

const TopPage: FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <TopHeader />
                    <TopMain />
                </Route>
                <Route path="/search/:keyword" component={ImageItemList} exact>
                    <ResultPage />
                </Route>
                <Route path="/download/:keyword" exact>
                    <DownloadPage />
                </Route>
            </Switch>
        </Router>
    );
};

export default TopPage;
