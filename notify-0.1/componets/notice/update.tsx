import React from "react";
import { Input, Button, DatePicker } from "@nextui-org/react";
import { Select, SelectItem, Chip, Image } from '@nextui-org/react';
import { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getLocalTimeZone, today, DateValue } from "@internationalized/date";
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading';

const roles = [
    { label: 'Student', value: 'student' },
    { label: 'Faculty', value: 'faculty' },
];

const departments = [
    { label: 'BCA', value: 'BCA' },
    { label: 'BBA', value: 'BBA' },
    { label: 'BCOM', value: 'BCOM' },
];

interface NoticeFornProps {
    currentNotice: {
        notice_title: string;
        notice_des: string;
        department: string[];
        roles: string[];
        expiry_date: null;
        notice_image: string[];
    };
    onSubmit: (formData: FormData) => void;
    onClose: () => void;
}

const UpdateNoticeform: React.FC<NoticeFornProps> = ({ currentNotice, onSubmit, onClose }) => {

    const [images, setImages] = React.useState<any[]>([]);
    const initialValues = useMemo(() => ({
        roles: currentNotice?.roles || [],
        department: currentNotice?.department || [],
        notice_title: currentNotice?.notice_title || '',
        notice_des: currentNotice?.notice_des || '',
        expiry_date: currentNotice?.expiry_date || null
    }), [currentNotice]);


    const formik = useFormik({
        initialValues,
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
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('notice_title', values.notice_title);
            formData.append('notice_des', values.notice_des);
            values.department.forEach((dep) => {
                formData.append('department[]', dep);
            });
            values.roles.forEach((role) => {
                formData.append('roles[]', role);
            });
            images.forEach((image) => {
                if (image.file instanceof File) {
                    formData.append('notice_images', image.file);
                }
            });
            if (values.expiry_date) {
                formData.append('expiry_date', values.expiry_date);
            }
            onSubmit(formData);
        },
        validateOnChange: true,
        validateOnBlur: true
    });

    const dateValueToISO = (dateValue: DateValue): string => {
        const { year, month, day } = dateValue;
        const date = new Date(Date.UTC(year, month - 1, day));
        return date.toISOString();
    };

    React.useEffect(() => {
        if (Array.isArray(currentNotice?.notice_image) && currentNotice.notice_image.length > 0) {
            setImages(currentNotice.notice_image.map(image => ({ data_url: image })));
        } else {
            setImages([{ data_url: '' }]);
        }
    }, [currentNotice]);


    const Imagechange = (imageList: ImageListType, addUpdatedIndex?: number[]) => {
        setImages(imageList.map((image: any) => ({
            ...image,
            file: image.file
        })));
    };

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" autoComplete="off">
            <div>
                <Input
                    isRequired
                    label="Notice Title"
                    placeholder="Enter Notice Name"
                    type="text"
                    id="notice_title"
                    name="notice_title"
                    value={formik.values.notice_title}
                    onChange={formik.handleChange}
                />
                {formik.touched.notice_title && formik.errors.notice_title ? (
                    <div className="text-red-500 text-xs">{formik.errors.notice_title}</div>
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
                    value={formik.values.notice_des}
                    onChange={formik.handleChange}
                />
                {formik.touched.notice_des && formik.errors.notice_des ? (
                    <div className="text-red-500 text-xs">{formik.errors.notice_des}</div>
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
                    // selectedKeys={formik.values.roles}
                    onSelectionChange={(keys) => {
                        formik.setFieldValue('roles', Array.from(keys));
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
                {formik.touched.roles && formik.errors.roles ? (
                    <div className="text-red-500 text-xs">{formik.errors.roles}</div>
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
                    // selectedKeys={formik.values.department}
                    onSelectionChange={(keys) => {
                        formik.setFieldValue('department', Array.from(keys));
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
                {formik.touched.department && formik.errors.department ? (
                    <div className="text-red-500 text-xs">{formik.errors.department}</div>
                ) : null}
            </div>
            <div>
                <div>
                    <ImageUploading
                        multiple
                        value={images}
                        onChange={Imagechange}
                        maxNumber={5}
                        dataURLKey="data_url"
                    >
                        {({ imageList, onImageUpload, onImageRemove, isDragging, dragProps }) => (
                            <div className="upload__image-wrapper flex gap-4">
                                <div className="flex flex-wrap gap-4">
                                    {imageList.map((image, index) => (
                                        <div key={index} className="relative w-32 h-32">
                                            {/* <div className='absolute -top-2 -right-1 rounded-full shadow-lg z-10 bg-red-600 text-white'>
                                                <button
                                                    onClick={() => onImageRemove(index)}
                                                    type="button"
                                                    className="px-1.5"
                                                >
                                                    ✕
                                                </button>
                                            </div> */}
                                            <Image
                                                src={image['data_url']}
                                                alt="Uploaded Image"
                                                className="rounded-lg z-0 border-1 border-black w-32 h-32"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {/* {images.length < 5 && (
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
                                )} */}
                            </div>
                        )}
                    </ImageUploading>

                </div>
            </div>
            <div>
                <Button type="submit" fullWidth color="primary" className="text-white">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default UpdateNoticeform;
