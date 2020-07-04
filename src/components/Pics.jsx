import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    justifyContent: 'center',
  },
  pic: {
    alignSelf: 'center',
    maxWidth: '100%',
    height: '15vh',
    objectFit: 'cover',
  },
}));

const Pics = (props) => {
  const { url, name, setSelectedImg, selectedImg } = props;
  const classes = useStyles();
  return (
    <Grid
      container
      item
      xs={4}
      className={classes.wrapper}
      onClick={() => setSelectedImg(url)}
    >
      <img
        className={classnames(classes.pic, {
          'selected-img cursor-default': url === selectedImg,
        })}
        src={url}
        alt={name}
      />
    </Grid>
  );
};

export default Pics;
