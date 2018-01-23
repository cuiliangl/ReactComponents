// 表单 input组件


import React, {Component} from 'react';

// 类型校验
import PropTypes from 'prop-types';


export default class Input extends Component {

    render() {
        let props = this.props;
        let {id, name, label, type, placeholder, value, className, defaultValue} = this.props;

        return (
            type === 'hidden' ?
                <input type={type} name={name} value={value} defaultValue={defaultValue}
                       ref="input"/>
                :
                (value === '' ?
                        <div className={"form-group " + className} style={props.style}>
                            <label htmlFor={id}>{label}</label>
                            <input className="form-widget"
                                   ref='input'
                                   defaultValue={defaultValue}
                                   data-validate={props.validate}
                                   disabled={props.disabled}
                                   onChange={props.onChange}
                                   name={name} type={type}
                                   id={id}
                                   placeholder={placeholder}
                            />
                        </div>
                        :
                        <div className={'form-group ' + className} style={props.style}>

                            <label htmlFor={id}>{label}</label>
                            <input className="form-widget"
                                   ref='input'
                                   data-validate={props.validate}
                                   value={value}
                                   disabled={props.disabled}
                                   onChange={props.onChange || this.onChange}
                                   name={name}
                                   type={type}
                                   id={id}
                                   placeholder={placeholder}
                            />
                        </div>

                )

        )
    }

    // 当value !== "" 时，需要一个Onchange （以防父组件没有传Onchange事件）
    onChange() {

    }
}


// 类型校验
Input.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string,

    // value 类型
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    label: PropTypes.string,

    // 表单类型
    type: PropTypes.string,

    // 是否禁用
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,

    // 自定义顶层元素的class
    className: PropTypes.string,

    // 自定义顶层元素的样式
    style: PropTypes.object,

    // label 和 input 一行显示
    inline: PropTypes.bool,

    // value 改变时的回调
    onChange: PropTypes.func

};

// 指定默认值
Input.defaultProps = {
    id: '' + Date.now() + Date.now(),
    type: 'text',
    value: '',
    label: '',
    placeholder: '',
    className: '',
    style: {},
    inline: false,
    disabled: false,

    // 表单校验
    validate: ''

};

