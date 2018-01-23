// 单选按钮组件


import React, {Component} from 'react';

import PropTypes from 'prop-types';

import "./radio.css"

export default class Radio extends Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        let {id, name, label, className, style, disabled, value} = this.props;

        // 选项
        let options = this.props.options.map((item, index) => {

            if (item.checked && !value) {
                value = item.value;
            }

           return(
               <label key={index} className="radio_label">
                   <span>{item.text}</span>
                   <input type="radio"
                          name={name}
                          value={item.value}
                          data-validate={this.props.validate}
                          disabled={disabled}
                          checked={this.state.value === item.value}
                          onChange={this.handleChange}

                   />
               </label>
           )
        });

        return (

            <div className={"form-group " + className} style={style} id={id}>
                <label>{label}</label>
                {options}
            </div>

        )
    }

    handleChange(e) {
        let value = e.target.value;
        this.setState({
            value
        });
        this.props.onChange && this.props.onChange(value,e);

    }
}


Radio.propTypes = {
    options: PropTypes.array.isRequired,
    id: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    onChange: PropTypes.func
};

Radio.defaultProps = {
    options: [],
    id: '' + Date.now() + Date.now(),
    disabled: false,
    className: '',
    style: {},
    value: ''
};