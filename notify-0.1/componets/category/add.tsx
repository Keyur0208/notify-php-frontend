"use client"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/modal';
import { Select, SelectItem, Chip } from '@nextui-org/react';
import { Input, Button } from '@nextui-org/react';
import { PlushIcon } from '../../style/icon/plushicon';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../src/store/store';
import { CategoryAdd } from '../../src/store/category/categoryslice';
import { getCategoryDate } from '../../src/store/category/categoryslice';

const roles = [
    { label: 'Student', value: 'student' },
    { label: 'Faculty', value: 'faculty' },
];

const departments = [
    { label: 'BCA', value: 'BCA' },
    { label: 'BBA', value: 'BBA' },
    { label: 'BCOM', value: 'BCOM' },
];

interface iCategoryData {
    category_name: string;
    department: string[];
    roles: string[];
}

export function AddCategory() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const dispatch: AppDispatch = useDispatch();

    const Categoryformik = useFormik({
        initialValues: {
            category_name: '',
            department: [],
            roles: [],
        },
        validationSchema: Yup.object({
            category_name: Yup.string().required('Category Name is required'),
            roles: Yup.array()
                .of(Yup.string().required("Role is required"))
                .min(1, "At least one role must be selected"),
            department: Yup.array()
                .of(Yup.string().required("Department is required"))
                .min(1, "At least one department must be selected"),
        }),
        onSubmit: (values: iCategoryData) => {
            dispatch(CategoryAdd(values));
            dispatch(getCategoryDate());
            Categoryformik.resetForm();
            onOpenChange();
        }
    });


    return (
        <>
            <div className="text-end my-2 ">
                <Button
                    color="secondary"
                    className="text-white font-semibold "
                    size="sm"
                    onClick={onOpen}
                >
                    <PlushIcon /> Add Category
                </Button>
            </div>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
                backdrop="opaque"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create New Category</ModalHeader>
                            <ModalBody>
                                <form className="flex flex-col gap-4" onSubmit={Categoryformik.handleSubmit} autoComplete="off">
                                    <div>
                                        <Input
                                            isRequired
                                            label="Category Name"
                                            placeholder="Enter Category Name"
                                            type="text"
                                            id="category_name"
                                            name="category_name"
                                            value={Categoryformik.values.category_name}
                                            onChange={Categoryformik.handleChange}
                                        />
                                        {Categoryformik.touched.category_name && Categoryformik.errors.category_name ? (
                                            <div className="text-red-500 text-xs">{Categoryformik.errors.category_name}</div>
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
                                            selectedKeys={Categoryformik.values.roles}
                                            onSelectionChange={(keys) => {
                                                Categoryformik.setFieldValue('roles', Array.from(keys));
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
                                        {Categoryformik.touched.roles && Categoryformik.errors.roles ? (
                                            <div className="text-red-500 text-xs">{Categoryformik.errors.roles}</div>
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
                                            value={Categoryformik.values.department}
                                            onSelectionChange={(keys) => {
                                                Categoryformik.setFieldValue('department', Array.from(keys));
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
                                        {Categoryformik.touched.department && Categoryformik.errors.department ? (
                                            <div className="text-red-500 text-xs">{Categoryformik.errors.department}</div>
                                        ) : null}
                                    </div>
                                    <div>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            color="primary"
                                            className="text-white"
                                        >
                                            Submit
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
