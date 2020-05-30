import React from 'react';
import {IconButton} from '@material-ui/core';
import {connect} from 'umi';
import {ConnectState, Dispatch} from '@/models/connect';
import {findIndex} from 'lodash';

const mapStateToProps = ({playHistory, play}: ConnectState) => ({
  songId: play.songId,
  list: playHistory.list,
});

type Props = {
  songId: number | null;
  list: any[];
  children?: React.ReactElement;
  type?: 'next' | 'prev';
  dispatch: (parse: Dispatch) => void;
};

function Skip(props: Props) {
  const onClick = () => {
    const {type, songId, list, dispatch} = props;
    if (list.length === 0) return;
    const index = findIndex(list, (o) => o.id === songId);

    if (index === -1) {
      if (typeof list[0] === 'undefined') return;

      dispatch({
        type: 'play/fetchSongUrl',
        payload: {id: list[0].id},
      });
      return;
    }

    if (type === 'next') {
      const i = index + 1 > list.length - 1 ? 0 : index + 1;
      if (typeof list[i] === 'undefined') return;
      dispatch({
        type: 'play/fetchSongUrl',
        payload: {id: list[i].id},
      });
      return;
    }

    if (type === 'prev') {
      const i = index - 1 < 0 ? list.length - 1 : index - 1;
      if (typeof list[i] === 'undefined') return;
      dispatch({
        type: 'play/fetchSongUrl',
        payload: {id: list[i].id},
      });
    }

  };

  return (
    <IconButton  onClick={onClick} disabled={props.list.length === 0}>
      {props.children}
    </IconButton>
  );
}

export default connect(mapStateToProps)(Skip);
