"use client"
import React from 'react';
import { Card, CardBody } from "@nextui-org/card";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from '@nextui-org/react';
import clsx from "clsx";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { ContactUsAdd } from '../src/store/contactus/contausctslice';
import { AppDispatch } from '../src/store/store';
import { useDispatch } from 'react-redux';

interface iContactusForm {
    fullname: string,
    email: string,
    des: string
}

const ContactUsform = () => {

    const dispatch: AppDispatch = useDispatch();

    const ContactUsformik = useFormik({
        initialValues: {
            fullname: '',
            email: '',
            des: '',
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required('First Name is required')
                .test('not-only-spaces', 'Full Name cannot be only spaces', (value: any) => {
                    return value && value.trim().length > 0;
                })
                .test('not-a-number', 'Full Name cannot be a number', (value: string) => {
                    return isNaN(Number(value));
                })
                .test('no-leading-number-or-space', 'Full Name cannot start with a number or space', (value: string) => {
                    return /^[^\d\s].*/.test(value);
                }),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            des: Yup.string()
                .required('Message is required')
        }),
        onSubmit: (values: iContactusForm) => {
            dispatch(ContactUsAdd(values));
            ContactUsformik.resetForm();
        },
    });


    return (
        <form onSubmit={ContactUsformik.handleSubmit} autoComplete='off' >
            <Card className="p-5 mt-10 ">
                <CardBody>
                    <p className="text-3xl font-medium w-full md:w-5/6">
                        {`Got Ideas? We've got the skills. Let's team up.`}
                    </p>
                    <p className={clsx("mt-3 font-normal")}>
                        {`Tell us more about yourself and what you’re got in mind.`}
                    </p>
                    <div className="flex flex-col gap-y-5 md:gap-y-7 mt-5">
                        <div className="w-full">
                            <Input
                                name="fullname"
                                id="fullname"
                                size="md"
                                type="text"
                                variant="bordered"
                                label="Full Name*"
                                fullWidth
                                placeholder="Full Name"
                                labelPlacement="outside"
                                value={ContactUsformik.values.fullname}
                                onChange={ContactUsformik.handleChange}
                            />
                            {ContactUsformik.touched.fullname && ContactUsformik.errors.fullname ? (
                                <div className=" text-red-500 text-xs">{ContactUsformik.errors.fullname}</div>
                            ) : null}
                        </div>
                        <div className="w-full">
                            <Input
                                name="email"
                                id="email"
                                size="md"
                                type="email"
                                variant="bordered"
                                label="Your Email*"
                                fullWidth
                                placeholder="Email"
                                labelPlacement="outside"
                                value={ContactUsformik.values.email}
                                onChange={ContactUsformik.handleChange}
                            />
                            {ContactUsformik.touched.email && ContactUsformik.errors.email ? (
                                <div className=" text-red-500 text-xs">{ContactUsformik.errors.email}</div>
                            ) : null}
                        </div>
                        <div>
                            <Textarea
                                name="des"
                                id="des"
                                type="text"
                                size="md"
                                label="Your Message*"
                                placeholder="Write your message.."
                                labelPlacement="outside"
                                variant="bordered"
                                value={ContactUsformik.values.des}
                                onChange={ContactUsformik.handleChange}
                            />
                            {ContactUsformik.touched.des && ContactUsformik.errors.des ? (
                                <div className=" text-red-500 text-xs">{ContactUsformik.errors.des}</div>
                            ) : null}
                        </div>
                        <Button
                            type="submit"
                            className=" text-white bg-border-blue"
                        >
                            Send Message
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </form>
    )
}

export default ContactUsform;