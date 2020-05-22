import React from "react";
import {connect} from 'umi'
import {formatMilliSeconds} from '@/utils/utils';
import {ConnectState} from "@/models/connect";


const mapStateToProps = ({play}: ConnectState) => ({
  playedSeconds: play.playedSeconds
})

export default connect(mapStateToProps)(({playedSeconds}: any) =>
  <span>{formatMilliSeconds(playedSeconds * 1000)}</span>)
