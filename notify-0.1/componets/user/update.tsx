import React from "react";
import { Input, Button, Snippet } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { useMemo } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EyeIcon from "../../style/icon/eyeicon";
import EyeSlashIcon from "../../style/icon/eyesalsIcon";

interface UserFormProps {
    currentUser: { _id: String, sid: string, email: string, first_name: string, last_name: string, roles: string, password: string, department: string };
    onSubmit: (values: { sid: string, email: string, first_name: string, last_name: string, roles: string, password: string, department: string }) => void;
    onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ currentUser, onSubmit, onClose }) => {

    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);


    const initialValues = useMemo(() => ({
        sid: currentUser?.sid || '',
        email: currentUser?.email || '',
        first_name: currentUser?.first_name || '',
        last_name: currentUser?.last_name || '',
        roles: currentUser?.roles || '',
        password: '',
        department: currentUser?.department || '',
    }), [currentUser]);

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Password is required')
                .min(5, 'Password must be at least 5 characters')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[0-9]/, 'Password must contain at least one digit')
                .matches(/[@$!%*?&#^()\-_=+{};:,<.>]/, 'Password must contain at least one special character')
            ,
        }),
        onSubmit: (values) => {
            onSubmit(values);
        },
        validateOnChange: true,
        validateOnBlur: true
    });

    return (
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4" autoComplete="off">
            <div>
                {currentUser?.roles.includes('student') ? (
                    <div>
                        <Input
                            isRequired
                            variant="bordered"
                            label="Sid"
                            placeholder="Enter Sid"
                            type="text"
                            id="sid"
                            name="sid"
                            isDisabled
                            value={formik.values.sid}
                            onChange={formik.handleChange}
                        />
                       <Snippet
                       fullWidth
                       variant="bordered"
                       >{formik.values.sid}</Snippet>
                    </div>
                ) : (
                    <Input
                        isRequired
                        variant="bordered"
                        label="Email"
                        placeholder="Enter Email"
                        type="text"
                        id="email"
                        name="email"
                        isDisabled
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    />
                )}
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Input
                    isRequired
                    variant="bordered"
                    label="First Name"
                    placeholder="Enter First Name"
                    type="text"
                    id="first_name"
                    name="first_name"
                    isDisabled
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                />
                <Input
                    variant="bordered"
                    isRequired
                    label="Last Name"
                    placeholder="Enter Last Name"
                    type="text"
                    id="last_name"
                    name="last_name"
                    isDisabled
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Input
                    variant="bordered"
                    isRequired
                    label="Roles"
                    placeholder="Enter Roles"
                    type="text"
                    id="roles"
                    name="roles"
                    isDisabled
                    value={formik.values.roles}
                    onChange={formik.handleChange}
                />
                <Input
                    variant="bordered"
                    isRequired
                    label="Department"
                    placeholder="Enter Department"
                    type="text"
                    id="department"
                    name="department"
                    isDisabled
                    value={formik.values.department}
                    onChange={formik.handleChange}
                />
            </div>
            <div>
                <Input
                    variant="bordered"
                    isRequired
                    label="Password"
                    placeholder="Enter password"
                    type={isVisible ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                            {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                        </button>
                    }
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-xs">{formik.errors.password}</div>
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

export default UserForm;
