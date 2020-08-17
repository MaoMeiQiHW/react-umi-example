/*
* 列表下拉上滑加载提示
* */
import React from 'react';
import styles from './index.module.scss';
import classNames from "classnames";

export const RefreshState = {
    Idle: 0,
    HeaderRefreshing: 1,
    FooterRefreshing: 2,
    NoMoreData: 3,
    Failure: 4,
    EmptyData: 5,
};

const renderFooter=(data, refreshState, onReachBottom)=> {
    switch (refreshState) {
        case RefreshState.HeaderRefreshing:
            return (
              <div className={styles.footerContainer}>
                  <div className={styles.loading}/>
                  <div className={styles.loadingName}>加载中</div>
              </div>);
            break;
        case RefreshState.Idle:
            return (<div className={styles.footerContainer}/>);
            break;
        case RefreshState.FooterRefreshing:
            return (
                <div className={styles.footerContainer}>
                    <div className={styles.loading}/>
                    <div className={styles.loadingName}>加载中</div>
                </div>);
            break;
        case RefreshState.NoMoreData:
            return (<div className={classNames(styles.footerContainer,styles.noMoreData)}>没有更多作品啦～</div>);
            break;
        case RefreshState.Failure:
            return (
                <div className={styles.footerContainer} onClick={() => {
                   if(data.length === 0){
                       onReachBottom(true);
                   }else{
                       onReachBottom();
                   }
                }}>
                    <div className={styles.reload}>点击重新加载</div>
                </div>);
            break;
        case RefreshState.EmptyData:

            return (
                <div className={styles.noDataIconContainer} onClick={()=>{
                    onReachBottom();
                }}>
                    <div className={styles.noData}>暂无更多数据</div>
                </div>);
            break;
    }
}

const RefreshListdiv = ({data, refreshState, onReachBottom, children}) => {
    return (
        <div>
            {children}
            {renderFooter(data, refreshState, onReachBottom)}
        </div>
    );
};

export default RefreshListdiv;
