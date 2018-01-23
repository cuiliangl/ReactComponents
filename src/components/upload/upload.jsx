// 上传组件

import React, {Component} from 'react';

import PropTypes from 'prop-types';

import './upload.css';

import 'whatwg-fetch';



export default class Upload extends Component {
    constructor(props) {
        super(props);

        this.uploadFile = this.uploadFile.bind(this);
        this.deleFile = this.deleFile.bind(this);

        this.state = {
            // 初始值
            value: this.props.value,
            // 初始数量
            num: this.props.value.length
        }
    }

    render() {

        let {type, num, size, disabled, label, id} = this.props;

        let {value} = this.state;

        // 提示语
        let remind = '';

        // 类型
        if (type && type !== '') {
            remind += `* 支持上传格式：${type}`
        }

        // 数量
        if (num && num !== '') {
            remind += `, 上传数量不超过：${num}`
        }

        // 大小
        if (size && size !== '') {
            remind += `, 单个文件大小不超过：${this.getFileSize(size)}`
        }


        // 已经存在文件 针对编辑 查看
        if (value && value.length > 0) {

            var files = value.map((item, index) => {

                // 图片
                if (/jpg|png|jepg|img$/i.test(item.type)) {

                    return (
                        <li key={index}>
                            {/*删除按钮*/}
                            {disabled ? '' : <span data-index={index} className="cursor" onClick={this.deleFile}> X </span>}
                            <img src={item.src || item.url} alt=''/>
                            <a href={item.href}>点击下载</a>
                        </li>
                    )
                } else {
                    // 其他类型文件
                    return (
                        <li key={index}>
                            {disabled ? '' : <span className="cursor" onClick={this.deleFile}> X </span>}
                            <a href={item.src || item.url}>{item.fileName}</a>
                        </li>
                    )
                }
            })
        }


        return (
            <div className={"form-upload form-group two"}>
                <label htmlFor={id}>
                    <span>{label}</span>
                    <input type="file"/>
                    <button onClick={this.uploadFile}>上  传</button>
                </label>
                <p>{remind}</p>
                <ul>
                    {files}
                </ul>
            </div>
        )


    }

    // 计算文件大小
    getFileSize(size) {
        let newSize = parseInt(size, 10);
        let maxSize;
        if (newSize < 1024) {
            // B
            maxSize = newSize + 'B';
        } else if (newSize > 1024 && newSize < 1024 * 1024) {
            // K
            maxSize = (newSize / 1024).toFixed(2) + 'K';
        } else {
            maxSize = (newSize / (1024 * 1024)).toFixed(2) + "M";
        }

        return maxSize;
    }


    // 上传文件
    uploadFile(e) {

        let {num, type, size, url} = this.props;

        let sibling = e.target.previousElementSibling;

        let files = sibling.files[0];

        if (!files) {
            console.log('请选择文件');
            return;
        }

        console.log(files);

        if (this.state.num >= num) {
            console.log('数量超了');
            return;
        }

        this.setState({
            num: this.state.num+1
        });

        // 文件大小
        let fileSize = files.size;

        // 判断大小
        if (fileSize > size) {
            console.log('超过大小');
            return;
        }

        // 文件类型
        // let category = type.indexOf('/').slice(type.indexOf('/')+1);

        let data = new FormData();

        data.append('file', files);
        data.append('type', type);
        data.append('max', size);

        // console.log(fetch);




        // 发起请求
        fetch(url, {
            body: data,
            method: "POST",
            catch: false,
            processData: false,
            contentType: false,
            dataType: 'json',
        })
            .then(res => {
                console.log(res);
            })
            .then(data => {

            })
            .catch(err => {
                alert(err.msg);
            })

    }

    // 删除文件
    deleFile(e) {

        let index = + e.target.dataset.index;

        this.state.value.splice(index, 1);

        this.setState({
            value: this.state.value,
            num: this.state.num-1
        })

    }
}

Upload.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.string,
    num: PropTypes.string,
    url: PropTypes.string.isRequired
};

Upload.defaultProps = {
    type: '',
    label: '',
    num: '',
    disabled: false,
    size: '',
    className: '',
    style: {}

};