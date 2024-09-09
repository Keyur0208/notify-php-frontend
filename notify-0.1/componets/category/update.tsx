import React, { useMemo } from "react";
import { Input, Button } from "@nextui-org/react";
import { Select, SelectItem, Chip } from '@nextui-org/react';
import { useFormik } from "formik";
import * as Yup from "yup";

const roles = [
    { label: 'Student', value: 'student' },
    { label: 'Faculty', value: 'faculty' },
];

const departments = [
    { label: 'BCA', value: 'BCA' },
    { label: 'BBA', value: 'BBA' },
    { label: 'BCOM', value: 'BCOM' },
];

interface CategoryFormProps {
    currentCategory: { category_name: string, roles: string, department: string };
    onSubmit: (values: { category_name: string, roles: string[], department: string[] }) => void;
    onClose: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ currentCategory, onSubmit, onClose }) => {

    const initialValues = useMemo(() => ({
        category_name: currentCategory?.category_name || '',
        roles: currentCategory?.roles ? currentCategory.roles.split(',') : [],
        department: currentCategory?.department ? currentCategory.department.split(',') : [],
    }), [currentCategory]);
    

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            category_name: Yup.string().required('Category Name is required'),
            roles: Yup.array()
                .of(Yup.string().required("Role is required"))
                .min(1, "At least one role must be selected"),
            department: Yup.array()
                .of(Yup.string().required("Department is required"))
                .min(1, "At least one department must be selected"),
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
        validateOnChange: true,
        validateOnBlur: true
    });

    console.log(currentCategory);

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" autoComplete="off">
            <div>
                <Input
                    isRequired
                    label="Category Name"
                    placeholder="Enter Category Name"
                    type="text"
                    id="category_name"
                    name="category_name"
                    value={formik.values.category_name}
                    onChange={formik.handleChange}
                />
                {formik.touched.category_name && formik.errors.category_name ? (
                    <div className="text-red-500 text-xs">{formik.errors.category_name}</div>
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
                    selectedKeys={new Set(formik.values.roles)}
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
                    selectedKeys={new Set(formik.values.department)}
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
                <Button type="submit" fullWidth color="primary" className="text-white">
                    Submit
                </Button>
            </div>
        </form>
    );
};

export default CategoryForm;
