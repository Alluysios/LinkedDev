import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addExperience } from '../../actions/profiles'

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description
    } = formData;

    const onInputChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onFormSubmit = e => {
        e.preventDefault();

        addExperience(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <form className="form" onSubmit={e => onFormSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* Job Title" value={title} onChange={e => onInputChange(e)} name="title" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Company" value={company} onChange={e => onInputChange(e)} name="company" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Location" value={location}  onChange={e => onInputChange(e)} name="location" />
                </div>
                <div className="form-group">
                <h4>From Date</h4>
                <input type="date" value={from} onChange={e => onInputChange(e)} name="from" />
                </div>
                <div className="form-group">
                <p><input type="checkbox" checked={current} name="current" value={current} 
                    onChange={e => {
                        setFormData({ ...formData, current: !current }) 
                        toggleDisabled(!toDateDisabled) 
                    }} /> Current Job</p>
                </div>
                <div className="form-group">
                <h4>To Date</h4>
                <input type="date" value={to} disabled={toDateDisabled ? 'disabled' : '' } onChange={e => onInputChange(e)} name="to" />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    value={description}
                    onChange={e => onInputChange(e)}
                    placeholder="Job Description"
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(AddExperience));
