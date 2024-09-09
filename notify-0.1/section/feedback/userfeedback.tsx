"use client";
import React from 'react';
import { Button, Input, Textarea } from '@nextui-org/react';
import { Heading } from '../../common/heading';
import { AppDispatch } from '../../src/store/store';
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FeedbackAdd } from '../../src/store/feedback/feedbackslice';

interface iFeedbackForm {
    feedback_rating: string;
    feedback_category: string[];
    feedback_des: string
}

const UserFeedbackPage = () => {
    const dispatch: AppDispatch = useDispatch();

    const Feedbackformik = useFormik({
        initialValues: {
            feedback_rating: '',
            feedback_category: [],
            feedback_des: '',
        },
        validationSchema: Yup.object({
            feedback_rating: Yup.string()
                .required('Rating is required'),
            feedback_category: Yup.array()
                .of(Yup.string().oneOf(['suggestions', 'somethings is not quite right', 'compliment', 'other'], 'Invalid category'))
                .min(1, 'At least one category must be selected'),
            feedback_des: Yup.string()
                .required('Feedback is required'),
        }),
        onSubmit: (values: iFeedbackForm) => {
            dispatch(FeedbackAdd(values));
            Feedbackformik.resetForm();
        },
    });


    const handleCategoryChange = (category: string) => {
        Feedbackformik.setFieldValue('feedback_category', [category]); // Store only the selected category
    };


    return (
        <>
            <Heading title="FeedBack" />
            <div className="p-6 max-w-lg mx-auto bg-bg-off-white-dashboard rounded-lg ">
                <h2
                    className="text-4xl font-bold text-center mb-4  text-border-blue"
                >
                    Your Feedback
                </h2>
                <form onSubmit={Feedbackformik.handleSubmit} autoComplete="off" >
                    <div className="flex flex-col justify-center items-center">
                        <div className="flex justify-center items-center space-x-4 text-3xl">
                            {[
                                { label: 'Very Sad', emoji: '😢', value: "1" },
                                { label: 'Sad', emoji: '😕', value: "2" },
                                { label: 'Neutral', emoji: '😐', value: "3" },
                                { label: 'Happy', emoji: '🙂', value: "4" },
                                { label: 'Very Happy', emoji: '😄', value: "5" },
                            ].map(({ label, emoji, value }) => (
                                <button
                                    type='button'
                                    key={value}
                                    className={`emoji-button ${Feedbackformik.values.feedback_rating === value ? 'selected' : ''}`}
                                    onClick={() => Feedbackformik.setFieldValue('feedback_rating', value)}

                                >
                                    <span
                                        role="img"
                                        aria-label={label}
                                        className={Feedbackformik.values.feedback_rating === value ? '' : 'filter grayscale'}
                                    >
                                        {emoji}
                                    </span>
                                </button>
                            ))}
                        </div>
                        {Feedbackformik.touched.feedback_rating && Feedbackformik.errors.feedback_rating ? (
                            <div className=" text-red-500 text-xs mt-4">{Feedbackformik.errors.feedback_rating}</div>
                        ) : null}
                    </div>
                    <div className="my-6 justify-center items-center">
                        <label className="block text-gray-700 mb-2">Please Select Your Feedback Category Below:</label>
                        <div className=" grid grid-cols-2 md:grid-cols-4 gap-4 text-3xl">
                            {[
                                { label: 'compliment', color: 'bg-red-500', value: "1" },
                                { label: 'somethings is not quite right', color: 'bg-yellow-500', value: "2" },
                                { label: 'suggestions', color: 'bg-green-500', value: "3" },
                                { label: 'other', color: 'bg-bg-text-dashboard', value: "4" },
                            ].map(({ label, color }) => (
                                <Button
                                    key={label}
                                    className={`${Feedbackformik.values.feedback_category.includes(label) ? color : 'bg-gray-200'} text-wrap h-12`}
                                    onClick={() => handleCategoryChange(label)}
                                >
                                    <h2 role="label" aria-label={label} className="text-xs">
                                        {label}
                                    </h2>
                                </Button>
                            ))}
                        </div>
                        {Feedbackformik.touched.feedback_category && Feedbackformik.errors.feedback_category ? (
                            <div className="text-red-500 text-xs mt-2">{Feedbackformik.errors.feedback_category}</div>
                        ) : null}
                    </div>
                    <div className="my-6">
                        <label className="block text-gray-700 mb-2">Your Feedback:</label>
                        <Textarea
                            aria-label="Feedback"
                            placeholder="Write your feedback here..."
                            id='feedback_des'
                            name='feedback_des'
                            className=' border-1 rounded-xl'
                            value={Feedbackformik.values.feedback_des}
                            onChange={Feedbackformik.handleChange}
                        />
                        {Feedbackformik.touched.feedback_des && Feedbackformik.errors.feedback_des ? (
                            <div className=" text-red-500 text-xs">{Feedbackformik.errors.feedback_des}</div>
                        ) : null}
                    </div>
                    <Button
                        color="primary"
                        fullWidth
                        className='text-white cursor-pointer '
                        type='submit'
                    >
                        Submit Feedback
                    </Button>
                </form>
            </div>
        </>
    );
};

export default UserFeedbackPage;
