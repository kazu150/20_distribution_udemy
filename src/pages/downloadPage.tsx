import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import firebase from '../firebase';
import TopHeader from '../components/topPage/topHeader';
import { TileData } from '../types/types';

const useStyle = makeStyles(() =>
    createStyles({
        tileImage: {
            height: '436px',
            width: '436px',
        },
    })
);

const DownloadPage: FC = () => {
    const { keyword } = useParams<{ keyword: string }>();
    const classes = useStyle();
    const [data, setData] = useState<TileData[]>([]);

    const getData = async (searchWord: string | undefined) => {
        const db = firebase.firestore();
        const tileDataRef = db.collection('tileData');
        const searchedData = tileDataRef.where('title', '==', searchWord);
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

    const downloadButton = () => {
        return (
            <div>
                {data.map((tile) => (
                    <Button variant="contained" href={tile.downloadUrl}>
                        画像を保存
                    </Button>
                ))}
            </div>
        );
    };

    const displayImage = () => {
        return (
            <div>
                <TopHeader />
                {data.map((tile) => (
                    <div>
                        <img
                            className={classes.tileImage}
                            src={tile.image}
                            alt={tile.title}
                        />
                    </div>
                ))}
            </div>
        );
    };
    return (
        <div>
            {displayImage()}
            {downloadButton()}
        </div>
    );
};

export default DownloadPage;
