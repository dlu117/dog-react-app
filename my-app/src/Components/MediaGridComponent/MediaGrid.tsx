import React, { useState, useEffect } from 'react';
import MediaCard from '../MediaCardComponent/MediaCard';
import { Grid } from '@material-ui/core';
import './MediaGrid.css';

interface IState {
    image: string[];
}

interface IMediaGridProps {
    SearchQuery: (string | null);
}

function MediaGrid(props:IMediaGridProps) {
    const [ItemArray, setItemArray] = useState<IState[]>([{ image: []}]);

    useEffect(() => {
        fetch('https://dog.ceo/api/breed/'+ props.SearchQuery + '/images')
            .then(response => response.json())
            .then(response => {
                setItemArray(response.message)
                console.log(response.message)
            })
            .catch(() => console.log("invalid dog breed")
            );

    },[props.SearchQuery] );

    var Cards: JSX.Element[] = [];
    ItemArray.forEach((el: IState, i: Number) => {
        if (!el ) {
            return;
        }
        Cards.push(
            <Grid key={"card_"+i} item sm={6} md={2} lg={3} className="MediaGridCard">
             <MediaCard ImageUrl={el as unknown as string} />
            </Grid>)
    })


    return (
        <div>
            <Grid container spacing={3} className="MediaGridContainer">
                {Cards}
            </Grid>
        </div>
    )
}

export default MediaGrid