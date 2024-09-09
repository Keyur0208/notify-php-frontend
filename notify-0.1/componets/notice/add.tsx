"use client"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Select, SelectItem, Chip, DatePicker, Spinner } from '@nextui-org/react';
import { Input, Button, Image } from '@nextui-org/react';
import { PlushIcon } from '../../style/icon/plushicon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../src/store/store';
import { getLocalTimeZone, today, DateValue } from "@internationalized/date";
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading';
import { NoticeAddSlice } from '../../src/store/notice/noticeslice';
import { getNoticeGetDataByCategory } from '../../src/store/notice/noticeslice';

const roles = [
    { label: 'Student', value: 'student' },
    { label: 'Faculty', value: 'faculty' },
];

const departments = [
    { label: 'BCA', value: 'BCA' },
    { label: 'BBA', value: 'BBA' },
    { label: 'BCOM', value: 'BCOM' },
];

interface iNoticeData {
    notice_title: string;
    notice_des: string;
    department: string[];
    roles: string[];
    expiry_date: null;
}


export function AddNotice({ categoryId, categoryname }: any) {

    const [localLoading, setLocalLoading] = React.useState(false);
    const [images, setImages] = React.useState<any[]>([]);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch: AppDispatch = useDispatch();

    const Noticeformik = useFormik({
        initialValues: {
            notice_title: '',
            notice_des: '',
            department: [],
            roles: [],
            expiry_date: null
        },
        validationSchema: Yup.object({
            notice_title: Yup.string().required('Notice Title is required'),
            notice_des: Yup.string().required('Notice Description is required'),
            expiry_date: Yup.string().required('Notice Expiry Date is required'),
            roles: Yup.array()
                .of(Yup.string().required("Role is required"))
                .min(1, "At least one role must be selected"),
            department: Yup.array()
                .of(Yup.string().required("Department is required"))
                .min(1, "At least one department must be selected"),
        }),
        onSubmit: async (values: iNoticeData,{setSubmitting}) => {
            // const formData = new FormData();
            // formData.append('notice_title', values.notice_title);
            // formData.append('notice_des', values.notice_des);
            // formData.append('category_name', categoryname);
            // values.department.forEach((dep) => {
            //     formData.append('department[]', dep);
            // });
            // values.roles.forEach((role) => {
            //     formData.append('roles[]', role);
            // });
            // images.forEach((image, index) => {
            //     if (image.file instanceof File) {
            //         formData.append('notice_images', image.file);
            //     }
            // });
            // if (values.expiry_date) {
            //     formData.append('expiry_date', values.expiry_date);
            // }
            await dispatch(NoticeAddSlice(values)).then(() => {
                dispatch(getNoticeGetDataByCategory(categoryId));
                Noticeformik.resetForm();
                images.length = 0; 
                onOpenChange();
                setLocalLoading(false);
                setSubmitting(false);
            }).catch(() => {
                setLocalLoading(false);
                setSubmitting(false);
            });
        }
    });

    const dateValueToISO = (dateValue: DateValue): string => {
        const { year, month, day } = dateValue;
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.toISOString();
    };

    const Imagechange = (imageList: ImageListType, addUpdatedIndex?: number[]) => {
        setImages(imageList.map((image: any) => ({
            ...image,
            file: image.file
        })));
    };
    

    return (
        <>
            <div className="text-end my-2 ">
                <Button
                    color="secondary"
                    className="text-white font-semibold "
                    size="sm"
                    onClick={onOpen}
                >
                    <PlushIcon /> Add Notice
                </Button>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="opaque"
                size="3xl"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create New Notice</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-4" onSubmit={Noticeformik.handleSubmit} autoComplete="off">
                                    <div>
                                        <Input
                                            isRequired
                                            label="Notice Title"
                                            placeholder="Enter Notice Name"
                                            type="text"
                                            id="notice_title"
                                            name="notice_title"
                                            value={Noticeformik.values.notice_title}
                                            onChange={Noticeformik.handleChange}
                                        />
                                        {Noticeformik.touched.notice_title && Noticeformik.errors.notice_title ? (
                                            <div className="text-red-500 text-xs">{Noticeformik.errors.notice_title}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Input
                                            isRequired
                                            label="Notice Description"
                                            placeholder="Enter Notice Description"
                                            type="text"
                                            id="notice_des"
                                            name="notice_des"
                                            value={Noticeformik.values.notice_des}
                                            onChange={Noticeformik.handleChange}
                                        />
                                        {Noticeformik.touched.notice_des && Noticeformik.errors.notice_des ? (
                                            <div className="text-red-500 text-xs">{Noticeformik.errors.notice_des}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Select
                                            items={roles}
                                            label="Roles"
                                            isMultiline
                                            selectionMode="multiple"
                                            placeholder="Select roles"
                                            name="roles"
                                            id="roles"
                                            selectedKeys={Noticeformik.values.roles}
                                            onSelectionChange={(keys) => {
                                                Noticeformik.setFieldValue('roles', Array.from(keys));
                                            }}
                                            renderValue={(selectedItems: any) => (
                                                <div>
                                                    {selectedItems.map((item: any) => (
                                                        <Chip key={item.key}>
                                                            {item.rendered}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {roles.map((role) => (
                                                <SelectItem key={role.value} textValue={role.label}>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex flex-col">
                                                            <span className="text-small">{role.label}</span>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        {Noticeformik.touched.roles && Noticeformik.errors.roles ? (
                                            <div className="text-red-500 text-xs">{Noticeformik.errors.roles}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Select
                                            items={departments}
                                            label="Department"
                                            isMultiline
                                            selectionMode="multiple"
                                            name="department"
                                            id="department"
                                            placeholder="Select departments"
                                            value={Noticeformik.values.department}
                                            onSelectionChange={(keys) => {
                                                Noticeformik.setFieldValue('department', Array.from(keys));
                                            }}
                                            renderValue={(selectedItems: any) => (
                                                <div>
                                                    {selectedItems.map((item: any) => (
                                                        <Chip key={item.key}>
                                                            {item.rendered}
                                                        </Chip>
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {departments.map((department) => (
                                                <SelectItem key={department.value} textValue={department.label}>
                                                    <div className="flex gap-2 items-center">
                                                        <div className="flex flex-col">
                                                            <span className="text-small">{department.label}</span>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </Select>
                                        {Noticeformik.touched.department && Noticeformik.errors.department ? (
                                            <div className="text-red-500 text-xs">{Noticeformik.errors.department}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <ImageUploading
                                            multiple
                                            value={images}
                                            onChange={Imagechange}
                                            maxNumber={5}
                                            dataURLKey="data_url"
                                        >
                                            {({
                                                imageList,
                                                onImageUpload,
                                                onImageRemove,
                                                isDragging,
                                                dragProps,
                                            }) => (
                                                <div className="upload__image-wrapper flex gap-4">
                                                    <div className="flex flex-wrap gap-4">
                                                        {imageList.map((image, index) => (
                                                            <div key={index} className="relative w-32 h-32">
                                                                {/* Remove Button */}
                                                                <div className='absolute -top-2 -right-1 rounded-full shadow-lg z-10 bg-red-600 text-white'>
                                                                    <button
                                                                        onClick={() => onImageRemove(index)}
                                                                        type="button"
                                                                        className="px-1.5"
                                                                    >
                                                                        ✕
                                                                    </button>
                                                                </div>
                                                                {/* Display Image */}
                                                                <Image
                                                                    src={image['data_url']}
                                                                    alt="Uploaded Image"
                                                                    className="rounded-lg z-0 border-1 border-black w-32 h-32"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Add More Pics Button */}
                                                    {images.length < 5 && (
                                                        <button
                                                            type="button"
                                                            style={isDragging ? { color: 'red' } : undefined}
                                                            onClick={onImageUpload}
                                                            {...dragProps}
                                                            className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-400 rounded-lg bg-bg-blue-dashboard cursor-pointer"
                                                        >
                                                            <div>
                                                                <div className="text-2xl">+</div>
                                                                <p className="text-sm">Upload Notice Image</p>
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </ImageUploading>
                                    </div>
                                    <div>
                                        <DatePicker
                                            isRequired
                                            label="Expiry  date"
                                            name="expiry_date"
                                            id="expiry_date"
                                            minValue={today(getLocalTimeZone())}
                                            onChange={(date) => {
                                                const isoDate = dateValueToISO(date);
                                                Noticeformik.setFieldValue('expiry_date', isoDate);
                                            }}
                                        />
                                        {Noticeformik.touched.expiry_date && Noticeformik.errors.expiry_date ? (
                                            <div className=" text-red-500 text-xs">{Noticeformik.errors.expiry_date}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            color="primary"
                                            className="text-white"
                                            isLoading={localLoading || Noticeformik.isSubmitting}
                                            disabled={localLoading || Noticeformik.isSubmitting}
                                        >
                                            {localLoading ? <Spinner/> : 'Submit'}
                                        </Button>
                                    </div>
                                </form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
