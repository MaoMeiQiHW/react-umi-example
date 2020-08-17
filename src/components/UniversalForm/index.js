import React, { useState, useEffect, useRef } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Select,
    Cascader,
    Upload,
    Form,
    DatePicker,
    Switch,
    Modal,
    Button,
    message,
} from 'antd';
import Http from '../../utils/Http';
import PropTypes from 'prop-types';
import * as commonApi from '../../api/common';
import styles from './index.module.scss';
import './index.scss';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import Countdown from './Countdown';

const Option = Select.Option;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const CustomForm = (props) => {
    const submitButton = useRef(null);
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [change, setChange] = useState(0);

    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        if (props.values) {
            form.setFieldsValue({ ...props.values });
        }
    }, []);

    useEffect(() => {
        form.setFieldsValue({ ...props.values });
    }, [props.values]);

    const onSubmit = (values) => {
        props.setSubmitLoading && props.setSubmitLoading(true);
        values = onCheckValues(values);
        setLoading(true);
        let infor = commonApi.gatContentProcess(values);
        Http.postForm(props.url, {
            ...props.value,
            content: JSON.stringify(infor),
        })
            .then((res) => {
                props.setSubmitLoading && props.setSubmitLoading(false);
                setLoading(false);
                if (res.status === 10000) {
                    message.success('提交成功');
                    props.onSubmit(res);
                } else {
                    message.error(res.message);
                }
            })
            .catch((err) => {
                props.setSubmitLoading && props.setSubmitLoading(false);
                setLoading(false);
                message.error('通讯失败');
            });
    };

    const onCheckValues = (values) => {
        for (let items of props.content) {
            if (items.formatFuc && values[items.id]) {
                values[items.id] = items.formatFuc(values[items.id]);
            } else if (
                (items.category === 4 || items.category === 5) &&
                values[items.id]
            ) {
                let list = values[items.id];
                let src = '';
                if (list.length > 0) {
                    list.map((res) => {
                        if (res.response) {
                            src += res.response.url + ',';
                        } else {
                            //默认图片数据值
                            //{
                            //     uid: '-1',
                            //     name: img[img.length-1],
                            //     status: 'done',
                            //     url: item,
                            // }
                            src += res.url + ',';
                        }
                    });
                }
                values[items.id] = src;
            }
        }
        return values;
    };

    const handlePreview = (file) => {
        setPreviewVisible(true);
        setPreviewImage(file.url || file.thumbUrl);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    const handleCancel = () => setPreviewVisible(false);
    const uploadButton = (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                alignItem: 'center',
                justifyContent: 'center',
                background: '#F8F8F8',
                height: '97px',
                width: '97px',
            }}
        >
            <PlusOutlined />
            <div
                style={{
                    textAlign: 'center',
                    color: '#999999',
                    fontSize: '14px',
                    paddingTop: '8px',
                }}
            >
                上传图片
            </div>
        </div>
    );

    const CssInput = withStyles({
        root: {
            '&:before': {
                borderBottomColor: '#EEEEEE',
            },
            '& ::placeholder': {
                color: '#999999',
                fontSize: '16px',
            },
            '&:after': {
                borderBottomColor: '#E6D579',
            },
        },
    })(Input);

    const CsstextAreatInput = withStyles({
        root: {
            background: '#F8F8F8',
            padding: '10px',
            marginTop: '8px',
            '&:before': {
                borderBottomColor: 'rgba(0,0,0,0)',
            },
            '& ::placeholder': {
                color: '#999999',
                fontSize: '16px',
            },
            '&:after': {
                borderBottomColor: '#E6D579',
            },
        },
    })(Input);

    return (
        <div className={styles.components}>
            <Form
                form={form}
                onFinish={onSubmit}
                labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
            >
                {/*1 文本 2长文本 3富文本 4单图片 5多图片  6日期 7日期时间  8手机号 9地区选择 10详细地址*/}
                {props.content.map((item) => {
                    switch (item.category) {
                        case 1:
                            return (
                                <div className={styles.inputItem}>
                                    <div className={styles.title}>
                                        {item.name}
                                    </div>
                                    <FormItem
                                        {...item}
                                        key={item.id}
                                        labelCol={{ span: item.labelCol }}
                                        wrapperCol={{ span: item.wrapperCol }}
                                        name={item.id}
                                        rules={[
                                            {
                                                required: item.required,
                                                message: '请输入' + item.name,
                                            },
                                        ]}
                                    >
                                        <CssInput
                                            allowClear
                                            fullWidth
                                            name={item.id}
                                            type={
                                                item.inputType == null
                                                    ? 'text'
                                                    : item.inputType
                                            }
                                            placeholder={'请输入' + item.name}
                                            className={styles.input}
                                            disabled={item.disabled}
                                        />
                                    </FormItem>
                                </div>
                            );
                        case 8:
                            return (
                                <>
                                    <FormItem
                                        {...item}
                                        key={item.id}
                                        labelCol={{ span: item.labelCol }}
                                        wrapperCol={{ span: item.wrapperCol }}
                                        name={item.id}
                                        rules={[
                                            {
                                                required: item.required,
                                                message: '请输入' + item.name,
                                            },
                                        ]}
                                    >
                                        <div className={styles.inputItem}>
                                            <div className={styles.title}>
                                                {item.name}
                                            </div>
                                            <CssInput
                                                allowClear
                                                fullWidth
                                                name={item.id}
                                                type={'number'}
                                                placeholder={
                                                    '请输入' + item.name
                                                }
                                                className={styles.input}
                                                disabled={item.disabled}
                                            />
                                        </div>
                                    </FormItem>
                                    {item.need_security_auth ? (
                                        <Form.Item
                                            className={styles.inputItem}
                                            labelCol={{ span: item.labelCol }}
                                            wrapperCol={{
                                                span: item.wrapperCol,
                                            }}
                                            key='code'
                                            name='code'
                                            rules={[
                                                {
                                                    required: true,
                                                    message: '请输入验证码',
                                                },
                                            ]}
                                        >
                                            <div>
                                                <div className={styles.title}>
                                                    验证码
                                                </div>
                                                <div className={styles.flexRow}>
                                                    <CssInput
                                                        fullWidth
                                                        placeholder='请输入验证码'
                                                        className={styles.input}
                                                    />
                                                    <Countdown
                                                        form={form}
                                                        indexId={item.id}
                                                    />
                                                </div>
                                            </div>
                                        </Form.Item>
                                    ) : (
                                        <div />
                                    )}
                                </>
                            );
                        case 'range':
                            return (
                                <FormItem
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    name={item.id}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: '请输入' + item.name,
                                        },
                                    ]}
                                >
                                    <RangePicker
                                        {...item}
                                        disabled={item.disabled}
                                        placeholder={
                                            item.placeholder || [
                                                '开始时间',
                                                '结束时间',
                                            ]
                                        }
                                        name={item.id}
                                    />
                                </FormItem>
                            );
                        case 'date':
                            return (
                                <FormItem
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    name={item.id}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: '请输入' + item.name,
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        {...item}
                                        disabled={item.disabled}
                                        placeholder={
                                            item.placeholder || '选择时间'
                                        }
                                        format={
                                            item.format == null
                                                ? 'YYYY-MM-DD'
                                                : item.format
                                        }
                                        name={item.id}
                                        disabledDate={(current) => {
                                            if (
                                                item.endTimeIndex &&
                                                form.getFieldValue(
                                                    item.endTimeIndex,
                                                )
                                            ) {
                                                return !(
                                                    current <
                                                    form.getFieldValue(
                                                        item.endTimeIndex,
                                                    )
                                                );
                                            } else if (
                                                item.startTimeIndex &&
                                                form.getFieldValue(
                                                    item.startTimeIndex,
                                                )
                                            ) {
                                                return !(
                                                    current >
                                                    form.getFieldValue(
                                                        item.startTimeIndex,
                                                    )
                                                );
                                            }
                                            return false;
                                        }}
                                    />
                                </FormItem>
                            );
                        case 'select':
                            return (
                                <FormItem
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    name={item.id}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: '请输入' + item.name,
                                        },
                                    ]}
                                >
                                    <Select
                                        placeholder='请选择'
                                        name={item.id}
                                        style={{ width: 120 }}
                                        disabled={item.disabled}
                                        // value={.props.values[item.id]}
                                    >
                                        {item.option.map((items, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={String(items.id)}
                                                >
                                                    {items.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </FormItem>
                            );
                        case 4:
                        case 5:
                            return (
                                <div className={styles.inputItem}>
                                    <div className={styles.flexRow}>
                                        <div className={styles.title}>
                                            {item.name}
                                        </div>
                                        <div className={styles.remarks}>
                                            {'(可上传' +
                                                item.max_length +
                                                '张)'}
                                        </div>
                                    </div>
                                    <Form.Item
                                        shouldUpdate
                                        key={item.id}
                                        name={item.id}
                                        valuePropName='fileList'
                                        getValueFromEvent={normFile}
                                        rules={[
                                            {
                                                required: item.required,
                                                message: '请选择' + item.name,
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(rule, value) {
                                                    if (!value) {
                                                        return Promise.reject(
                                                            '',
                                                        );
                                                    }
                                                    if (
                                                        value.length <=
                                                        item.max_length
                                                    ) {
                                                        return Promise.resolve();
                                                    }
                                                    return Promise.reject(
                                                        '最多可上传' +
                                                            item.max_length +
                                                            '张图片',
                                                    );
                                                },
                                            }),
                                        ]}
                                        dependencies={[item.id]}
                                    >
                                        <Upload
                                            multiple={
                                                item.max_length > 1
                                                    ? true
                                                    : false
                                            }
                                            fileList={fileList}
                                            className='uploadImg'
                                            listType='picture-card'
                                            accept='image/jpeg,image/jpg,image/png'
                                            action='/api/common/file/upload'
                                            onChange={(value) => {
                                                setChange(Math.random() + 1);
                                            }}
                                            onPreview={handlePreview}
                                            disabled={item.disabled}
                                        >
                                            {change &&
                                            form.getFieldValue(item.id) &&
                                            form.getFieldValue(item.id)
                                                .length >=
                                                (item.max_length || 1)
                                                ? null
                                                : uploadButton}
                                        </Upload>
                                    </Form.Item>
                                </div>
                            );
                        case 'cascader':
                            return (
                                <Form.Item
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    name={item.id}
                                    rules={[
                                        {
                                            type: 'array',
                                            required: item.required,
                                            // message: 'Please select your habitual residence!'
                                        },
                                    ]}
                                >
                                    <Cascader
                                        disabled={item.disabled}
                                        options={item.option}
                                        placeholder={'请选择'}
                                    />
                                </Form.Item>
                            );
                        case 'tags':
                            return (
                                <Form.Item
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: item.message || '必填',
                                        },
                                    ]}
                                >
                                    <Select
                                        disabled={item.disabled}
                                        mode='tags'
                                        style={{ width: '100%' }}
                                        tokenSeparators={[',']}
                                        placeholder={'输入后回车即可'}
                                    >
                                        {item.option.map((items, index) => {
                                            return (
                                                <Option
                                                    key={index}
                                                    value={items.id}
                                                >
                                                    {items.name}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>
                            );
                        case 2:
                            return (
                                <div className={styles.inputItem}>
                                    <div className={styles.title}>
                                        {item.name}
                                    </div>
                                    <FormItem
                                        key={item.id}
                                        labelCol={{ span: item.labelCol }}
                                        wrapperCol={{ span: item.wrapperCol }}
                                        name={item.id}
                                        rules={[
                                            {
                                                required: item.required,
                                                message: '请输入' + item.name,
                                            },
                                        ]}
                                    >
                                        <CsstextAreatInput
                                            name={item.id}
                                            disabled={item.disabled}
                                            rows={7}
                                            fullWidth
                                            multiline
                                            placeholder={
                                                item.placeholder
                                                    ? item.placeholder
                                                    : '请输入'
                                            }
                                            className={styles.input}
                                        />
                                    </FormItem>
                                </div>
                            );
                        case 'switch':
                            return (
                                <FormItem
                                    key={item.id}
                                    label={item.name}
                                    labelCol={{ span: item.labelCol }}
                                    wrapperCol={{ span: item.wrapperCol }}
                                    name={item.id}
                                    valuePropName={'checked'}
                                    initialValue={false}
                                    rules={[
                                        {
                                            required: item.required,
                                            message: item.message || '必填',
                                        },
                                    ]}
                                >
                                    <Switch
                                        unCheckedChildren={'关'}
                                        disabled={item.disabled}
                                        checkedChildren={'开'}
                                    />
                                </FormItem>
                            );
                    }
                })}
                <Form.Item noStyle>
                    <div
                        style={{
                            display: 'none',
                        }}
                    >
                        <Button
                            ref={submitButton}
                            htmlType='submit'
                            loading={loading}
                            type='primary'
                            style={{ marginLeft: '10px' }}
                        >
                            {props.confirmTxt ? props.confirmTxt : '确定'}
                        </Button>
                    </div>
                    {props.submitButton(() => {
                        submitButton.current.click();
                    })}
                </Form.Item>
            </Form>
            <Modal
                visible={previewVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <img
                    alt='上传的图片'
                    style={{ width: '100%' }}
                    src={previewImage}
                />
            </Modal>
        </div>
    );
};

export default CustomForm;
const Content = {
    id: PropTypes.string.isRequired, //参数名
    name: PropTypes.string, //标题
    labelCol: PropTypes.number, //标题栅格宽度 以24格为最大值
    wrapperCol: PropTypes.number, //标题栅格宽度 表单一栏所占宽度
    required: PropTypes.bool, //是否必填
    message: PropTypes.string, //必填提示文字
    placeholder: PropTypes.string, //表单提示文字
    option: PropTypes.array, //select、cascader 选项
    disabled: PropTypes.bool, //是否禁用
    formatFuc: PropTypes.func, //在提交前，格式化参数的函数
    format: PropTypes.string, //date 类型的可使用格式日期显示
};

CustomForm.propTypes = {
    values: PropTypes.object, //表单初始值 以key:value的形式传入
    url: PropTypes.string.isRequired, //表单提交的接口地址
    value: PropTypes.object, //表单提交时，许携带的额外参数 以key:value的形式传入
    onSubmit: PropTypes.func, //表单提交成功后，执行的方法
    content: PropTypes.arrayOf(PropTypes.shape(Content)), //表单的每项设置
    title: PropTypes.string, //标题
    confirmTxt: PropTypes.string, //表单提交的按钮 文本内容
    inputType: PropTypes.string, //input输入类型
    endTimeIndex: PropTypes.string, //对比的结束时间参数名
    startTimeIndex: PropTypes.string, //对比的开始时间参数名
};
