import React, { useState, useEffect, FC } from 'react';
import firebase from '../../firebase';
import { TileData } from '../../types/types';
import { useParams, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '80%',
            textAlign: 'center',
            marginTop: '2%',
        },
        tileImage: {
            height: '218px',
            width: '218px',
        },
    })
);

const ImageItemList: FC = () => {
    const [data, setData] = useState<TileData[]>([]);
    const { keyword } = useParams<{ keyword: string }>();
    const classes = useStyles();
    const history = useHistory();

    const getData = async (searchWord: string | undefined) => {
        const db = firebase.firestore();
        const tileDataRef = db.collection('tileData');
        const searchedData = tileDataRef.where(
            'keyword',
            'array-contains',
            searchWord
        );
        const snapShot = await searchedData.get();
        const temporaryData: object[] = [];

        snapShot.docs.map((doc) => {
            temporaryData.push(doc.data());
        });

        setData(temporaryData as TileData[]);
    };

    useEffect(() => {
        getData(keyword);
    }, []);

    return (
        <div className={classes.root}>
            {data.map((tile, index) => (
                <div key={index}>
                    <Button
                        onClick={() => history.push('/download/' + tile.title)}
                    >
                        <img
                            className={classes.tileImage}
                            src={tile.image}
                            alt={tile.title}
                        />
                    </Button>
                    <h3>{tile.title}</h3>
                </div>
            ))}
        </div>
    );
};

export default ImageItemList;
