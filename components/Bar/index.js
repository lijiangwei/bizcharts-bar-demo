import React from 'react';
import {
    Row,
    Col,
    Select,
    Button,
} from 'antd';
import styles from './index.css';
import BasicBar from './BasicBar';


export default class Index extends React.Component {

  state = {
    dataType: 'csv',
    dataCSV: '',
    dataJSON: [],
    displayBasicBar: true,
    //定义文件列
    header: [
        {
            key: "genre",
            value: "种类"
        },
        {
            key: "sold",
            value: "销量",
        },
        {
            key: "income",
            value: "收入"
        }
    ],
    //定义坐标轴显示的字段
    axis: {
        x: "genre",
        y: "sold",
    },
    x: "genre",
    y: "sold",
    type: 'csv',
  }

  onHandleAxias(type, value){
      this.setState({
          [type]: value
      });
  }

  componentDidMount(){
    this.changeType("csv");
  }

  changeType(value){
    this.setState({
        dataType: value,
    });
    if(value === "csv"){
        this.queryDataCSV();
    }else{
        this.queryDataJSON();
    }
  }

  queryDataJSON(){
    fetch("test.json", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        }
      }).then(response => {
        return response.json();
      })
      .then(response => {
        this.setState({
            dataJSON: response
        });
      });
  }

  queryDataCSV(){
    fetch("test.csv", {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        }
      }).then(response => {
        return response.text();
      })
      .then(response => {
        this.setState({
          dataCSV: response
        });
      });
  }

  refreshBasicBar() {
      this.setState({
        displayBasicBar: false,
      });
      setTimeout(() => {
        this.setState({
            displayBasicBar: true,
            axis: {
                x: this.state.x,
                y: this.state.y,
            },
            type: this.state.dataType,
          });
      }, 1000);
  }

  render(){

    const { dataCSV, dataJSON, header, displayBasicBar, axis: {x, y}, type } = this.state;

    const dataSource = type === 'csv' ? dataCSV : dataJSON;

    return (
      <div>
        <h2>基础柱状图</h2>
        <Row>
            <Col span={4}>
                数据类型:
                <Select
                    onChange={(value) => this.changeType(value)}
                    defaultValue="csv"
                    className={styles.axis}>
                    <Select.Option key="csv">CSV</Select.Option>
                    <Select.Option key="default">JSON</Select.Option>
                </Select>
            </Col>
            <Col span={4}>
                X轴：
                <Select placeholder="选择x轴"
                    defaultValue={x}
                    onChange={(value) => this.onHandleAxias('x', value)}
                    className={styles.axis}
                    >
                    { header.map(item => <Select.Option key={item.key}>{item.value}</Select.Option>) }
                </Select>
            </Col>
            <Col span={4}>
                Y轴:
                <Select placeholder="选择Y轴"
                    defaultValue={y}
                    onChange={(value) => this.onHandleAxias('y', value)}
                    className={styles.axis}
                    >
                    { header.map(item => <Select.Option key={item.key}>{item.value}</Select.Option>) }
                </Select>
            </Col>
            <Col span={4}>
                <Button type="primary" onClick={() => this.refreshBasicBar()}>查询</Button>
            </Col>
        </Row>
        { displayBasicBar ? 
            <BasicBar 
                type={type}
                data={dataSource}
                x={x}
                y={y}/> : null }
      </div>
    );
  }
}
