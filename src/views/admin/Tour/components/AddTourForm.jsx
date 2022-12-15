import React from 'react';
import {Button, DatePicker, Form, Input, Modal} from "antd";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {addNewTour, getListTours} from "../../../../redux/tourSlice";
import Swal from "sweetalert2";
import {getListUsers} from "../../../../redux/authSlice";

const AddTourForm = (props) => {
    const {isOpen, onCancel} = props;
    const {form} = useForm();
    const dispatch = useDispatch();

    const onFinish = async (data) => {
        try {
            const payload = {
                name: data.name,
                email: data.email,
                phone: data.phone,
                people: data.people,
                date: data.date,
                fee: data.fee
            };
            await dispatch(addNewTour(payload));
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
            await dispatch(getListTours())
        }
    }

    return (
        <Modal
            title='Thêm mới một Tour'
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
                    label="Họ tên"
                    name="name"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số điện thoại"
                    name="phone"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Số hành khách"
                    name="people"
                    rules={[{ required: true, message: 'Hãy nhập email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Ngày tạo"
                    name="date"
                    rules={[{ required: true, message: 'Hãy nhập họ tên!' }]}
                >
                    <DatePicker
                        format='YYYY-MM-DD'
                    />
                </Form.Item>

                <Form.Item
                    label="Chi phí"
                    name="fee"
                    rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
                >
                    <Input />
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

export default AddTourForm;