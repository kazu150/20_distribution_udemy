import React, { FC, useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import background from '../../assets/images/background.jpg';
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from 'react-router-dom';

const useStyle = makeStyles(() =>
    createStyles({
        background: {
            backgroundImage: `url(${background})`,
            height: '100vh',
            backgroundSize: 'cover',
        },
        paper: {
            position: 'relative',
            marginLeft: 'auto',
            marginRight: 'auto',
            top: '33%',
            width: '45%',
        },
        inputBase: {
            width: '80%',
        },
    })
);

const TopMain: FC = () => {
    const classes = useStyle();
    const [keyword, setKeyword] = useState('');
    const history = useHistory();

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setKeyword(event.target.value);
    };

    const handleSubmit = () => {
        history.push('/search/' + keyword);
    };

    return (
        <div className={classes.background}>
            <Paper
                className={classes.paper}
                component="form"
                onSubmit={handleSubmit}
            >
                <IconButton type="submit">
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.inputBase}
                    placeholder="検索する文字列を入力してください"
                    value={keyword}
                    onChange={handleChange}
                />
            </Paper>
        </div>
    );
};

export default TopMain;
