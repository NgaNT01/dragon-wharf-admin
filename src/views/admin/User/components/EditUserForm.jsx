import React, {useState} from 'react';
import {Button, ConfigProvider, DatePicker, Form, Input, Modal} from "antd";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import moment from "moment";
import locale from "antd/locale/vi_VN";
import dayjs from "dayjs";
import {getUserById, updateUserInfo} from "../../../../redux/authSlice";
import Swal from "sweetalert2";

const EditUserForm = (props) => {
    const {isOpen, onCancel, userInfo} = props;
    const {form} = useForm();
    const dispatch = useDispatch();
    const [dob, setDob] = useState(userInfo.dob);

    const onFinish = async (data) => {
        try {
            const payload = {
                userId: userInfo._id,
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    dob: dob,
                }

            };
            console.log("payload",payload);
            await dispatch(updateUserInfo(payload));
            await Swal.fire(
                'Thành công!',
                'Bạn đã thay đổi thông tin user!',
                'success'
            )
        }
        catch (err) {console.log(err)}
        finally {
            await dispatch(getUserById(userInfo._id));
        }
    }

    const handleChangeDob = (dob) => {
        setDob(dob);
        console.log(dob);
    }


    const fields = [
        {
            name: ['email'],
            value: userInfo.email
        },
        {
            name: ['name'],
            value: userInfo.name
        },
        {
            name: ['phone'],
            value: userInfo.phone
        },

    ];

    return (
        <Modal
            title='Chỉnh sửa thông tin user'
            open={isOpen}
            onCancel={onCancel}
            footer={null}
        >
            <Form
                name="addForm"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
                fields={fields}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}

                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    label="Họ tên"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập họ tên!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày sinh"
                >
                    <ConfigProvider locale={locale}>
                        <DatePicker
                            format='DD/MM/YYYY'
                            defaultValue={dayjs(`${moment(userInfo.dob).format('DD/MM/YYYY')}`,'DD/MM/YYYY')}
                            onChange={(e) => {handleChangeDob(e)}}
                        ></DatePicker>
                    </ConfigProvider>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                     <Button
                        type="primary"
                        htmlType="submit"
                     >
                        Save
                      </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
}


export default EditUserForm;