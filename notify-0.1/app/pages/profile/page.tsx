"use client"
import { Avatar, Button, Snippet, Input, Tabs, Tab } from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/store/store";
import { Heading } from "../../../common/heading";
import { useState, useMemo } from "react";
import ImageUploading from 'react-images-uploading';
import { DatePicker } from "@nextui-org/date-picker";
import { AppDispatch } from "../../../src/store/store";
import { useDispatch } from "react-redux";
import React from "react";
import { useFormik } from "formik";
import { UpdateProfile, getUserData, UpdateSecretkey } from "../../../src/store/auth/Authslice";
import { getToken } from "../../../common/token";
import * as Yup from 'yup';
import SecretKeyIcon from "../../../style/icon/secretkeyicon";

export default function ProfilePage() {
    const token: string = getToken() || '';
    const [images, setImages] = useState<any[]>([]);
    const { data } = useSelector((state: RootState) => state.auth.userData);
    const dispatch: AppDispatch = useDispatch();
    const capitalizeFirstLetter = (role: string): string => {
        if (!role) return '';
        return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
    };

    const formattedRoles = Array.isArray(data?.roles)
        ? data.roles.map((role: string) => capitalizeFirstLetter(role))
        : [];

    const formattedDepartment = Array.isArray(data?.department)
        ? data.department.map((dep: string) => dep)
        : [];

    const initialValues = useMemo(
        () => ({
            first_name: data?.first_name || '',
            last_name: data?.last_name || '',
            email: data?.email || '',
            dob: data?.dob || '',
            sid: data?.sid || '',
        }),
        [data]
    );

    const hasroleimage =  data?.roles?.includes("admin")
        ? "/admin.png"
        : data?.roles?.includes("student")
        ? "/students.png"
        : "/faculty.png"

    React.useEffect(() => {
        if (data?.profile_image && data.profile_image.trim() !== "") {
            setImages([{ data_url: data?.profile_image }]);
        } else {
            setImages([{ data_url: hasroleimage }]);
        }
    }, [data]);

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }: any) => {
            const formData = new FormData();
            formData.append('first_name', values.first_name);
            formData.append('last_name', values.last_name);
            formData.append('email', values.email);
            formData.append('sid', values.sid);
            formData.append('dob', values.dob);
            if (images.length > 0 && images[0].file) {
                formData.append('profile_image', images[0].file);
            }
            try {
                await dispatch(UpdateProfile(formData));
                await dispatch(getUserData(token));
            } catch (error) {
            } finally {
                setSubmitting(false);
            }
        },
        validateOnChange: true,
        validateOnBlur: true
    });

    const onChange = (imageList: any) => {
        setImages(imageList.map((image: any) => ({
            ...image,
            file: image.file
        })));
    };


    interface iSecretKeyData {
        secret_key: string,
    }

    const secret_keyformik = useFormik({
        initialValues: {
            secret_key: '',
            confirm_secret_key: '',
        },
        validationSchema: Yup.object({
            secret_key: Yup.string()
                .required('Secret Key is required'),
            confirm_secret_key: Yup.string()
                .oneOf([Yup.ref('secret_key')], 'Secret Key must match')
                .required('Please confirm your Secret Key'),
        }),
        onSubmit: async (values: iSecretKeyData, { setSubmitting }: any) => {
            try {
                const { secret_key } = values;
                console.log(secret_key);
                await dispatch(UpdateSecretkey({ secret_key }));
                await dispatch(getUserData(token));
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
                secret_keyformik.resetForm();
            }
        },
    });

    const hasrole = data?.roles?.includes('admin');

    return (
        <>
            <Heading title="Profile" />
            <div className="mx-auto flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row justify-center  w-full xl:max-w-[1280px] p-5  gap-0 sm:gap-0 rounded-lg mt-14 ">
                <div className="w-full sm:w-10/12 md:w-5/12 lg:w-5/12">
                    <div className="flex flex-col justify-center items-center">
                        <ImageUploading
                            multiple={false}
                            value={images}
                            onChange={onChange}
                            maxNumber={1}
                            dataURLKey="data_url"
                        >
                            {({ imageList, onImageUpdate }) => (
                                <div className="flex flex-wrap justify-center gap-5 lg:gap-10">
                                    {
                                        imageList.map((image, index) => (
                                            <div key={index} className="flex flex-wrap justify-center flex-row items-center gap-5 lg:gap-10">
                                                <div className="image-item">
                                                    <div>
                                                        <Avatar
                                                            src={image['data_url']}
                                                            alt="Profile Image"
                                                            classNames={{
                                                                base: "h-48 w-48",
                                                            }}
                                                            showFallback={true}
                                                            isBordered={true}
                                                        />
                                                        <span >
                                                            <Button
                                                                size="sm"
                                                                color="primary"
                                                                className="mx-10 mt-4 text-white"
                                                                onClick={() => onImageUpdate(index)}
                                                                type="button"
                                                            >
                                                                Change Image
                                                            </Button>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}
                        </ImageUploading>
                        <div className="my-2">
                            <h1 className="font-semibold text-3xl">{formik.values.first_name} {formik.values.last_name}</h1>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl">{formattedRoles.join(', ')}</h3>
                        </div>
                        <div>
                            <h3 className="font-light text-md mt-2">{`${formattedDepartment.join(', ')}`}</h3>
                        </div>
                    </div>
                </div>
                <div className="w-full sm:w-11/12 md:w-4/12 lg:w-6/12 sm:mt-5 lg:mt-0">
                    <Tabs
                        aria-label="Profile Tabs form"
                        fullWidth
                        variant="underlined"
                        color="primary"
                        size="md"
                    >
                        <Tab
                            key="profile"
                            title="Profile"
                            value="profile"
                        >
                            <div className="my-1">
                                {
                                    hasrole ?
                                        (
                                            <>
                                                <label className="text-sm">Email</label>
                                                <Snippet
                                                    fullWidth>
                                                    {data?.email}
                                                </Snippet>
                                            </>

                                        ) :
                                        (
                                            <>
                                                <label className="text-sm">Sid</label>
                                                <Snippet
                                                    fullWidth>
                                                    {data?.sid}
                                                </Snippet>
                                            </>
                                        )
                                }

                            </div>
                            <form onSubmit={formik.handleSubmit} autoComplete="off">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-5">
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        label="First Name"
                                        labelPlacement="outside"
                                        value={formik.values.first_name}
                                        onChange={formik.handleChange}
                                        classNames={{
                                            input: "capitalize"
                                        }}
                                    />
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        label="Last Name"
                                        value={formik.values.last_name}
                                        onChange={formik.handleChange}
                                        labelPlacement="outside"
                                        classNames={{
                                            input: "capitalize"
                                        }}
                                    />
                                </div>
                                <div className="grid grid-cols-1  gap-2 my-5">
                                    {
                                        hasrole ?
                                            (
                                                <Input
                                                    isReadOnly
                                                    id="sid"
                                                    name="sid"
                                                    type="text"
                                                    label="Sid"
                                                    value={formik.values.sid}
                                                    onChange={formik.handleChange}
                                                    labelPlacement="outside"
                                                />
                                            ) :
                                            (
                                                <Input
                                                    isReadOnly
                                                    id="email"
                                                    name="eamil"
                                                    type="text"
                                                    label="Email"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                    labelPlacement="outside"
                                                />
                                            )
                                    }
                                </div>
                                <div>
                                    <Button
                                        className="text-white"
                                        color="primary"
                                        fullWidth
                                        type="submit"
                                        isLoading={formik.isSubmitting}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </Tab>
                        {
                            hasrole &&
                            (
                                <Tab
                                    key="secret_key"
                                    title="Secret Key"
                                    value="secret_key"
                                >
                                    <form onSubmit={secret_keyformik.handleSubmit} autoComplete="off">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 my-3">
                                            <Input
                                                id="first_name"
                                                name="first_name"
                                                type="text"
                                                label="First Name"
                                                isReadOnly
                                                labelPlacement="outside"
                                                value={formik.values.first_name}
                                                onChange={formik.handleChange}
                                                classNames={{
                                                    input: "capitalize"
                                                }}
                                            />
                                            <Input
                                                id="last_name"
                                                name="last_name"
                                                type="text"
                                                label="Last Name"
                                                isReadOnly
                                                value={formik.values.last_name}
                                                onChange={formik.handleChange}
                                                labelPlacement="outside"
                                                classNames={{
                                                    input: "capitalize"
                                                }}
                                            />
                                        </div>
                                        <div className="py-2">
                                            <Input
                                                id="secret_key"
                                                name="secret_key"
                                                type="password"
                                                label="Secret Key"
                                                value={secret_keyformik.values.secret_key}
                                                onChange={secret_keyformik.handleChange}
                                                labelPlacement="outside"
                                                placeholder="**********"
                                                classNames={{
                                                    input: "capitalize"
                                                }}
                                                endContent={<SecretKeyIcon />}
                                            />
                                            {secret_keyformik.touched.secret_key && secret_keyformik.errors.secret_key ? (
                                                <div className="text-red-500 text-xs">{secret_keyformik.errors.secret_key}</div>
                                            ) : null}
                                        </div>
                                        <div className="py-2">
                                            <Input
                                                id="confirm_secret_key"
                                                name="confirm_secret_key"
                                                type="password"
                                                label="Confirm Secret Key"
                                                value={secret_keyformik.values.confirm_secret_key}
                                                onChange={secret_keyformik.handleChange}
                                                labelPlacement="outside"
                                                placeholder="**********"
                                                classNames={{
                                                    input: "capitalize"
                                                }}
                                                endContent={<SecretKeyIcon />}
                                            />
                                            {secret_keyformik.touched.confirm_secret_key && secret_keyformik.errors.confirm_secret_key ? (
                                                <div className="text-red-500 text-xs">{secret_keyformik.errors.confirm_secret_key}</div>
                                            ) : null}
                                        </div>
                                        <div className="my-2">
                                            <Button
                                                className="text-white"
                                                color="primary"
                                                fullWidth
                                                type="submit"
                                                isLoading={secret_keyformik.isSubmitting}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </form>
                                </Tab>
                            )
                        }

                    </Tabs>

                </div>
            </div>
        </>
    );
}
