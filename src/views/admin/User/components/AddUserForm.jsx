import React from 'react';
import {Form, Modal, Input, Button, DatePicker} from "antd";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {createUser, getListUsers} from "../../../../redux/authSlice";
import Swal from "sweetalert2";
import moment from "moment";

const AddUserForm = (props) => {
    const {isOpen, onCancel} = props;
    const {form} = useForm();
    const dispatch = useDispatch();

    const onFinish = async (data) => {
        try {
            const payload = {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                dob: data.dob || null,
            };

            if (payload.dob === null) delete payload.dob;

            console.log("payload",payload);

            await dispatch(createUser(payload));
            await Swal.fire(
                'Thành công!',
                'Bạn đã thêm một User mới!',
                'success'
            )
        }
        catch (err) {
            await Swal.fire({
                icon: 'error',
                title: 'Ôi không...',
                text: `${err.message}`
            })
        }
        finally {
            await dispatch(getListUsers())
        }



    }

    return (
        <Modal
            title='Thêm mới một User'
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
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Hãy nhập password!' }]}
                >
                    <Input.Password />
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
                    name="dob"
                >
                    <DatePicker
                        format='DD/MM/YYYY'
                    ></DatePicker>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddUserForm;