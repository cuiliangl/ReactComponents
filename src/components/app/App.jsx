import React, {Component} from 'react';
import logo from '../../image/logo.svg';
import './App.css';


import Input from '../input/input';
import Select from '../select/select';
import Radio from '../radio/radio';
import Upload from '../upload/upload';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mess: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeSel = this.handleChangeSel.bind(this);
        this.getValue = this.getValue.bind(this);
    }
    render() {
        let options = [{text: '上海', value: '001'},{text: '北京', value: '002', selected: false},{text: '天津', value: '003'}]


        let files = [
            {
                src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516274523116&di=62202aa6f0b1a6924f94795487f4d5b1&imgtype=0&src=http%3A%2F%2Fhimg2.huanqiu.com%2Fattachment2010%2F2017%2F0306%2F20170306110026474.jpg',
                fileName: '高圆圆',
                href: '#',
                type: 'jpg'
            },
            {
                src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516274622188&di=d805d4f2155beddf29f9133ef4c49352&imgtype=0&src=http%3A%2F%2Fimage.tianjimedia.com%2FuploadImages%2F2016%2F120%2F51%2FJM7G8D8I672A.jpg',
                fileName: '美女',
                href: "#",
                type: 'jpg'
            }
        ];
        return (
            <div className="container">
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo"/>
                        <h1 className="App-title">Welcome to React {this.state.mess}</h1>
                    </header>
                </div>
                <div className="main">
                    <Input name="userName"
                           disabled={false}
                           label="用户名："
                           value=""
                           type="text"
                           placeholder=""
                           defaultVlaue = ""
                           className="one"
                    />

                    <Select ref="select" options={options} name="city" label="城市：" value="001" defaultValue="003" onChange={this.handleChangeSel}/>
                    <Radio name="city"
                           ref="radio"
                           label="省市："
                           options={options}
                           value="001"
                           disabled={false}
                           onChange={this.handleChange}
                    />

                    <Upload name="file1"
                            label="门店图片："
                            type="msg,oft,eml,word,excel,pdf,png,jpg,jpeg"
                            size="10485760"
                            num="2"
                            value={files}
                            url="./"
                    />

                    {/*<button ref="btn" onClick={this.getValue}>获取</button>*/}
                </div>
            </div>
        );
    }

    handleChange(value, e) {
        console.log(e.target.value);
        // console.log(value);



    }
    handleChangeSel(e) {
        console.log(e.target.value);

    }

    getValue() {
        console.log(this.refs.radio.state.value);
    }



}

