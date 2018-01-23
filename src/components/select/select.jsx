// 下拉组件

import React, {Component} from 'react';

import PropTypes from 'prop-types';


export default class Select extends Component {
    render() {
        let props = this.props;
        let label = props.label;
        let name = props.name;
        let id = props.id;
        let className = props.className;
        let style = props.style;
        let value = props.value;

        // 所有选项
        let options = props.options.map((item, index) => {

            if (item.selected && !value) {
                value = item.value;
            }

            return <option value={item.value} key={index}>{item.text}</option>
        });
        // console.log(options);

        return (
            <div className={"form-group" + className} style={style}>
                <label htmlFor={id}>{label}</label>
                {value === '' ?
                    <select className="form-widget"
                            name={name} id={id} ref="select"
                            data-validate={props.validate}
                            defaultValue={props.defaultValue}
                            disabled={props.disabled}
                            onChange={props.onChange}
                    >
                        {options}
                    </select>
                    :
                    <select className="form-widget"
                            name={name} id={id} ref="select"
                            data-validate={props.validate}
                            value={value}
                            disabled={props.disabled}
                            onChange={props.onChange || this.onChange}
                    >
                        {options}
                    </select>
                }
            </div>
        )
    }

    onChange() {

    }
}


Select.propTypes = {
    // 选项
    options: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    id: PropTypes.string
};

Select.defaultProps = {
    label: '',
    className: '',
    style: {},
    id: '' + Date.now() + Date.now(),
    disabled: false,
    value: '',
    index: ''

};

