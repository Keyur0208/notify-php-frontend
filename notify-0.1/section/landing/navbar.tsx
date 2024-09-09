"use client"
import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Image,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { MenuItems } from "../../lib/navigation";
import Link from "next/link";
import { ThemeSwitch } from "../../componets/theme-switch";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typewriter } from 'react-simple-typewriter'
import clsx from "clsx";
import '../../style/hero-section.css';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input } from "@nextui-org/react";
import { Tabs, Tab, DatePicker } from "@nextui-org/react";
import MailIcon from "../../style/icon/mailIcon";
import EyeIcon from "../../style/icon/eyeicon";
import EyeSlashIcon from "../../style/icon/eyesalsIcon";
import SecretKeyIcon from "../../style/icon/secretkeyicon";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Register, login } from "../../src/store/auth/Authslice";
import { AppDispatch, RootState } from "../../src/store/store";
import { useDispatch, useSelector } from 'react-redux';
import { getLocalTimeZone, today, DateValue } from "@internationalized/date";
import { useRouter } from "next/navigation";

interface iRegisterData {
  roles: string;
  first_name: string;
  last_name: string;
  dob: string | null;
  department: string;
  email: string;
  password: string;
  secret_key?: string;
}

interface iLoginData {
  roles: string,
  sid?: string,
  email?: string,
  password: string,
  secret_key?: string;
}


export default function Navbars() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isColor, setIsColor] = useState<boolean>(false);
  const { isOpen: isLoginOpen, onOpen: OnLoginOpen, onOpenChange: OnLoginOpenChange } = useDisclosure();
  const { isOpen: isRegisterOpen, onOpen: onRegisterOpen, onOpenChange: onRegisterOpenChange } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const deaprtment = [
    {
      label: "BCA",
      value: "BCA"
    },
    {
      label: "BBA",
      value: "BBA"
    },
    {
      label: "BCOM",
      value: "BCOM"
    }
  ]

  useEffect(() => {
    const changeColorOnScroll = () => {
      if (window.scrollY >= 50) {
        setIsColor(true);
      } else {
        setIsColor(false);
      }
    };

    window.addEventListener("scroll", changeColorOnScroll);

    return () => {
      window.removeEventListener("scroll", changeColorOnScroll);
    };
  }, []);


  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    if (menuToggleRef.current) {
      menuToggleRef.current.click();
    }
  };

  const ForwardedNavbarMenuToggle = forwardRef<
    HTMLButtonElement,
    React.ComponentProps<typeof NavbarMenuToggle>
  >((props, ref) => (
    <NavbarMenuToggle {...props} ref={ref} className={clsx("lg:hidden", isColor ? "text-black" : "text-white")} />
  ));

  const [roles, setRoles] = useState<string>("student");

  const dispatch: AppDispatch = useDispatch();

  const dateValueToISO = (dateValue: DateValue): string => {
    const { year, month, day } = dateValue;
    const date = new Date(Date.UTC(year, month - 1, day));
    return date.toISOString();
  };

  const { data, } = useSelector((state: RootState) => state.auth.userData);
  const router = useRouter();

  const Registerformik = useFormik({
    initialValues: {
      roles: roles,
      first_name: 'k',
      last_name: 'p',
      dob: null,
      department: '',
      email: 'k@gmail.com',
      password: 'Keyur@85',
      secret_key: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required('First Name is required')
        .test('not-only-spaces', 'First Name cannot be only spaces', (value: any) => {
          return value && value.trim().length > 0;
        })
        .test('not-a-number', 'First Name cannot be a number', (value: string) => {
          return isNaN(Number(value));
        })
        .test('no-leading-number-or-space', 'First Name cannot start with a number or space', (value: string) => {
          return /^[^\d\s].*/.test(value);
        }),
      last_name: Yup.string()
        .required('Last Name is required')
        .test('not-only-spaces', 'Last Name cannot be only spaces', (value: any) => {
          return value && value.trim().length > 0;
        })
        .test('not-a-number', 'Last Name cannot be a number', (value: string) => {
          return isNaN(Number(value));
        })
        .test('no-leading-number-or-space', 'Last Name cannot start with a number or space', (value: string) => {
          return /^[^\d\s].*/.test(value);
        }),
      dob: Yup.date().required('Birthdate is required'),
      department: Yup.string().required('Department is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .test('not-a-number', 'Email cannot be a number', (value: any) => {
          return isNaN(value);
        }),
      password: Yup.string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Password must contain at least one digit')
        .matches(/[@$!%*?&#^()\-_=+{};:,<.>]/, 'Password must contain at least one special character')
      ,
      secret_key: roles === 'faculty'
        ? Yup.string().required('Secret Key is required ')
        : Yup.string(),
    }),
    onSubmit: (values: iRegisterData) => {
      const formData: iRegisterData = { ...values };
      if (formData.roles === 'student') {
        delete formData.secret_key;
      }
      dispatch(Register(formData));
    },
  });

  const Loginformik = useFormik({
    initialValues: {
      roles: roles,
      sid: '',
      email: 'keyur@gmail.com',
      password: '123',
      secret_key: 'keyur',
    },
    validationSchema: Yup.object({
      sid: roles === 'student'
        ? Yup.string().required('Sid is required ')
        : Yup.string(),
      email: roles === 'faculty' || roles === 'admin'
        ? Yup.string().email('Invalid email address').required('Email is required')
        : Yup.string(),
      password: Yup.string().required('Password is required'),
      secret_key: roles === 'faculty' || roles === 'admin'
        ? Yup.string().required('Secret Key is required ')
        : Yup.string(),
    }),
    onSubmit: async (values: iLoginData) => {
      const formData: iLoginData = { ...values };
      if (formData.roles === 'student') {
        delete formData.secret_key;
        delete formData.email;
        try {
          await dispatch(login(formData));
          if (data?.includes("student")) 
          {
            router.push('/pages/dashboard');
          } 
          else {
            Loginformik.resetForm();
          }
        } catch (error) {
          Loginformik.resetForm();
        }
      }
      else if (formData.roles === 'faculty' || formData.roles === 'admin') {
        delete formData.sid;
        dispatch(login(formData));
      }
    },
  });

  const RegisterhandleRoleChange = (newValue: string) => {
    setRoles(newValue);
    Registerformik.resetForm({
      values: {
        ...Registerformik.initialValues,
        roles: newValue,
      },
    });
  };

  const LoginhandleRoleChange = (newValue: string) => {
    setRoles(newValue);
    Loginformik.resetForm({
      values: {
        ...Loginformik.initialValues,
        roles: newValue,
      },
    });
  };

  useEffect(() => {
    if (data) {
      if (data?.roles?.includes("admin")) {
        router.push('/pages/dashboard');
      }
      else if (data?.roles?.includes("student") || data?.roles?.includes("faculty")) {
        router.push('/pages/dashboard');
      }
    }
  }, [data, router]);

  
  return (
    <>
      <div id="home">
        <Carousel
          showArrows={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop={true}
          autoPlay={true}
          emulateTouch={false}
          preventMovementUntilSwipeScrollTolerance={false}
          swipeable={false}
          showThumbs={false}
          interval={3000}
        >
          <div>
            <img src="/landing/carousel/slider1.png" className="w-full h-[15rem] lg:h-[40rem] brightness-50" alt="Slide 1" />
          </div>
          <div>
            <img src="/landing/carousel/slider2.jpg" className="w-full h-[15rem] lg:h-[40rem] brightness-50" alt="Slide 1" />
          </div>
        </Carousel>
        <div className="absolute top-20 lg:top-52 left-10 md:left-12 ">
          <h1 className="text-lg lg:text-6xl text-white font-semibold">
            <Typewriter
              words={['Amroli College Campus', 'Saraswati Shaikshanik Sankul']}
              loop={Infinity}
              cursor
              cursorStyle='_'
              typeSpeed={50}
              deleteSpeed={30}
            />
          </h1>
          <p className="w-full md:w-7/12 py-1 md:py-3 text-xs lg:text-lg text-slate-300 change">

          </p>
          <div>
            <Button
              color="primary"
              className="text-white block lg:hidden"
              size="sm">
              Contact Us
            </Button>
            <Button
              color="primary"
              className="text-white  hidden lg:block"
              size="md">
              Contact Us
            </Button>
          </div>

        </div>
      </div>
      <NextUINavbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        height="5rem"
        className={clsx("fixed  transition-all duration-100", isColor ? "" : "bg-transparent backdrop-blur-none")}
        isBordered={isColor ? true : false}
      >
        <NavbarContent>
          <NavbarBrand>
            <Image
              src="/logo.png"
              className="size-32 lg:size-44 "
              alt="Dark_icon"
            />
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex gap-4">
            {MenuItems.slice(0, 4).map((item, index) => (
              <div key={`${item.name}-${index}`} className="text-center">
                <Link
                  href={`#${item.id}`}
                  className={clsx("relative mr-2 lg:mr-2 xl:mr-6  after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full", isColor ? "text-black after:bg-black" : "text-white after:bg-white")}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </NavbarItem>
          <NavbarItem className="hidden lg:flex items-center gap-4">
            <Button
              variant="bordered"
              color={isColor ? "secondary" : "default"}
              className={clsx(isColor ? "text-black" : "text-white")}
              radius="sm"
              onClick={OnLoginOpen}
            >
              Login Us
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden lg:flex gap-4">
            <Button
              color="primary"
              size="md"
              radius="sm"
              className="px-5 font-medium text-white"
              onClick={onRegisterOpen}
            >
              Register
            </Button>
          </NavbarItem>
          {/* <ThemeSwitch /> */}
          <ForwardedNavbarMenuToggle ref={menuToggleRef} />
        </NavbarContent>
        <NavbarMenu
          className="bg-transparent"
        >
          {MenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`} className="text-center">
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={clsx("relative mr-2 lg:mr-2 xl:mr-6  after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[2px] after:bg-white dark:after:bg-white after:transition-all after:duration-300 hover:after:w-full", isColor ? "text-black" : "text-white")}
                onClick={handleMenuItemClick}
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
          <NavbarMenuItem className="text-center">
            <Button
              color="secondary"
              variant="bordered"
              radius="sm"
              onClick={
                OnLoginOpen
              }
            >
              Login Us
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="text-center">
            <Button
              color="primary"
              size="md"
              radius="sm"
              className="px-5 font-medium text-white"
              onClick={onRegisterOpen}
            >
              Register
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </NextUINavbar>

      {/* Login Modal */}
      <Modal
        isOpen={isLoginOpen}
        onOpenChange={OnLoginOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Log Us</ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Tabs
                    aria-label="Login Tabs form"
                    fullWidth
                    variant="underlined"
                    selectedKey={roles}
                    onSelectionChange={(newValue: any) => LoginhandleRoleChange(newValue as string)}
                    color="primary"
                    size="md"
                  >
                    <Tab
                      key="student"
                      title="Student"
                      value="student"
                    >
                      <form className="flex flex-col gap-4" onSubmit={Loginformik.handleSubmit} autoComplete="off">
                        <div>
                          <Input
                            isRequired
                            label="Sid"
                            id="sid"
                            name="sid"
                            placeholder="Enter your Sid"
                            type="text"
                            value={Loginformik.values.sid}
                            onChange={Loginformik.handleChange}
                          />
                          {Loginformik.touched.sid && Loginformik.errors.sid ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.sid}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? 'text' : 'password'}
                            value={Loginformik.values.password}
                            onChange={Loginformik.handleChange}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                              </button>
                            }
                          />
                          {Loginformik.touched.password && Loginformik.errors.password ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.password}</div>
                          ) : null}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            color="primary"
                            className=" text-white"
                            type="submit"
                          >
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab
                      key="faculty"
                      title="Faculty"
                      value="faculty"
                    >
                      <form className="flex flex-col gap-4" onSubmit={Loginformik.handleSubmit} autoComplete="off">
                        <div>
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={Loginformik.values.email}
                            onChange={Loginformik.handleChange}
                            endContent={<MailIcon />}
                          />
                          {Loginformik.touched.email && Loginformik.errors.email ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.email}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? 'text' : 'password'}
                            value={Loginformik.values.password}
                            onChange={Loginformik.handleChange}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                              </button>
                            }
                          />
                          {Loginformik.touched.password && Loginformik.errors.password ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.password}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Secret Key"
                            placeholder="Enter your secret key"
                            type="password"
                            name="secret_key"
                            value={Loginformik.values.secret_key}
                            onChange={Loginformik.handleChange}
                            endContent={<SecretKeyIcon />}
                          />
                          {Loginformik.touched.secret_key && Loginformik.errors.secret_key ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.secret_key}</div>
                          ) : null}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            type="submit"
                            color="primary"
                            className=" text-white"
                          >
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab
                      key="admin"
                      title="Admin"
                      value="admin"
                    >
                      <form className="flex flex-col gap-4" onSubmit={Loginformik.handleSubmit} autoComplete="off">
                        <div>
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={Loginformik.values.email}
                            onChange={Loginformik.handleChange}
                            endContent={<MailIcon />}
                          />
                          {Loginformik.touched.email && Loginformik.errors.email ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.email}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? 'text' : 'password'}
                            value={Loginformik.values.password}
                            onChange={Loginformik.handleChange}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                              </button>
                            }
                          />
                          {Loginformik.touched.password && Loginformik.errors.password ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.password}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Secret Key"
                            placeholder="Enter your secret key"
                            type="password"
                            name="secret_key"
                            value={Loginformik.values.secret_key}
                            onChange={Loginformik.handleChange}
                            endContent={<SecretKeyIcon />}
                          />
                          {Loginformik.touched.secret_key && Loginformik.errors.secret_key ? (
                            <div className=" text-red-500 text-xs">{Loginformik.errors.secret_key}</div>
                          ) : null}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            fullWidth
                            type="submit"
                            color="primary"
                            className=" text-white"
                          >
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
                <div className="text-center">
                  <hr></hr>
                  <p className="text-center text-small pt-5">
                    If You not create Account ?
                    <button
                      className="px-2 text-border-blue"
                      onClick={() => {
                        OnLoginOpenChange();
                        onRegisterOpen();
                      }}
                    >
                      Regitser
                    </button>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>

              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Register Modal */}
      <Modal
        isOpen={isRegisterOpen}
        onOpenChange={onRegisterOpenChange}
        placement="top-center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center text-2xl">Registeration Now</ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full">
                  <Tabs
                    aria-label="Register Tabs form"
                    fullWidth
                    variant="underlined"
                    selectedKey={roles}
                    onSelectionChange={(newValue: any) => RegisterhandleRoleChange(newValue as string)}
                    color="primary"
                    size="md"
                  >
                    <Tab key="student" title="Student" value="student">
                      <form className="flex flex-col gap-4" onSubmit={Registerformik.handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          <div>
                            <Input
                              isRequired
                              label="First Name"
                              placeholder="Enter your first name"
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={Registerformik.values.first_name}
                              onChange={Registerformik.handleChange}
                            />
                            {Registerformik.touched.first_name && Registerformik.errors.first_name ? (
                              <div className=" text-red-500 text-xs">{Registerformik.errors.first_name}</div>
                            ) : null}
                          </div>
                          <div>
                            <Input
                              isRequired
                              label="Last Name"
                              placeholder="Enter your last name"
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={Registerformik.values.last_name}
                              onChange={Registerformik.handleChange}
                            />
                            {Registerformik.touched.last_name && Registerformik.errors.last_name ? (
                              <div className=" text-red-500 text-xs">{Registerformik.errors.last_name}</div>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <DatePicker
                            isRequired
                            label="Birth date"
                            name="dob"
                            id="dob"
                            maxValue={today(getLocalTimeZone())}
                            onChange={(date) => {
                              const isoDate = dateValueToISO(date);
                              Registerformik.setFieldValue('dob', isoDate);
                            }}
                          />
                          {Registerformik.touched.dob && Registerformik.errors.dob ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.dob}</div>
                          ) : null}
                        </div>
                        <div>
                          <Autocomplete
                            isRequired
                            defaultItems={deaprtment}
                            label="Department"
                            placeholder="Select The Department"
                            id="dep"
                            name="dep"
                            onSelectionChange={(selectedValue) => Registerformik.setFieldValue('department', selectedValue)}
                          >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                          </Autocomplete>
                          {Registerformik.touched.department && Registerformik.errors.department ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.department}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={Registerformik.values.email}
                            onChange={Registerformik.handleChange}
                            endContent={<MailIcon />}
                          />
                          {Registerformik.touched.email && Registerformik.errors.email ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.email}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? 'text' : 'password'}
                            value={Registerformik.values.password}
                            onChange={Registerformik.handleChange}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                              </button>
                            }
                          />
                          {Registerformik.touched.password && Registerformik.errors.password ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.password}</div>
                          ) : null}
                        </div>
                        {Registerformik.values.roles === 'faculty' && (
                          <div>
                            <Input
                              isRequired
                              label="Secret Key"
                              placeholder="Enter your secret key"
                              type="text"
                              name="secret_key"
                              value={Registerformik.values.secret_key}
                              onChange={Registerformik.handleChange}
                            />
                            {Registerformik.touched.secret_key && Registerformik.errors.secret_key ? (
                              <div className=" text-red-500 text-xs">{Registerformik.errors.secret_key}</div>
                            ) : null}
                          </div>
                        )}
                        <div className="flex gap-2 justify-end">
                          <Button fullWidth color="primary" className=" text-white" type="submit">
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                    <Tab key="faculty" title="Faculty" value="faculty">
                      <form className="flex flex-col gap-4" onSubmit={Registerformik.handleSubmit} autoComplete="off">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                          <div>
                            <Input
                              isRequired
                              label="First Name"
                              placeholder="Enter your first name"
                              type="text"
                              id="first_name"
                              name="first_name"
                              value={Registerformik.values.first_name}
                              onChange={Registerformik.handleChange}
                            />
                            {Registerformik.touched.first_name && Registerformik.errors.first_name ? (
                              <div className=" text-red-500 text-xs">{Registerformik.errors.first_name}</div>
                            ) : null}
                          </div>
                          <div>
                            <Input
                              isRequired
                              label="Last Name"
                              placeholder="Enter your last name"
                              type="text"
                              id="last_name"
                              name="last_name"
                              value={Registerformik.values.last_name}
                              onChange={Registerformik.handleChange}
                            />
                            {Registerformik.touched.last_name && Registerformik.errors.last_name ? (
                              <div className=" text-red-500 text-xs">{Registerformik.errors.last_name}</div>
                            ) : null}
                          </div>
                        </div>
                        <div>
                          <DatePicker
                            isRequired
                            label="Birth date"
                            name="dob"
                            id="dob"
                            maxValue={today(getLocalTimeZone())}
                            onChange={(date) => {
                              const isoDate = dateValueToISO(date);
                              Registerformik.setFieldValue('dob', isoDate);
                            }}
                          />
                          {Registerformik.touched.dob && Registerformik.errors.dob ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.dob}</div>
                          ) : null}
                        </div>
                        <div>
                          <Autocomplete
                            isRequired
                            defaultItems={deaprtment}
                            label="Department"
                            placeholder="Select The Department"
                            id="dep"
                            name="dep"
                            onSelectionChange={(selectedValue) => Registerformik.setFieldValue('department', selectedValue)}
                          >
                            {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                          </Autocomplete>
                          {Registerformik.touched.department && Registerformik.errors.department ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.department}</div>
                          ) : null}

                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={Registerformik.values.email}
                            onChange={Registerformik.handleChange}
                            endContent={<MailIcon />}
                          />
                          {Registerformik.touched.email && Registerformik.errors.email ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.email}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            id="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type={isVisible ? 'text' : 'password'}
                            value={Registerformik.values.password}
                            onChange={Registerformik.handleChange}
                            endContent={
                              <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? <EyeSlashIcon /> : <EyeIcon />}
                              </button>
                            }
                          />
                          {Registerformik.touched.password && Registerformik.errors.password ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.password}</div>
                          ) : null}
                        </div>
                        <div>
                          <Input
                            isRequired
                            label="Secret Key"
                            placeholder="Enter your secret key"
                            type="password"
                            name="secret_key"
                            value={Registerformik.values.secret_key}
                            onChange={Registerformik.handleChange}
                            endContent={<SecretKeyIcon />}
                          />
                          {Registerformik.touched.secret_key && Registerformik.errors.secret_key ? (
                            <div className=" text-red-500 text-xs">{Registerformik.errors.secret_key}</div>
                          ) : null}
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            className=" text-white">
                            Sign up
                          </Button>
                        </div>
                      </form>
                    </Tab>
                  </Tabs>
                </div>
                <div className="text-center">
                  <hr></hr>
                  <p className="text-center text-small pt-5">
                    Already have an account?
                    <button
                      className="px-2 text-border-blue"
                      onClick={() => {
                        onRegisterOpenChange();
                        OnLoginOpen();
                      }}
                    >
                      Login
                    </button>
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
