import React from 'react';
import { useForm } from 'react-hook-form';
import { create_log_entry } from '../api';

const LogEntryForm = ({ location }) => {
    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        try {
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await create_log_entry(data);
            console.log(created);
        } catch (error) {

        }
    }


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
                <label htmlFor="title">Title</label>
                <input name="title" type="text" required ref={register} />
                <label htmlFor="description">Description</label>
                <textarea name="description" rows="3" ref={register}></textarea>
                <label htmlFor="image">Image</label>
                <input name="image" type="text" ref={register} />
                <label htmlFor="visitDate">Visit Date</label>
                <input name="visitDate" type="date" ref={register} required />
                <button >Create Log Entry</button>
            </form>
        </div>
    );
};

export default LogEntryForm;