import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addEducation } from '../../actions/profiles'

const AddEducation = ({ addEducation, history }) => {

    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        degree,
        school,
        fieldofstudy,
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

        addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Education
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add your past degree or your current study.
            </p>
            <form className="form" onSubmit={e => onFormSubmit(e)}>
                <div className="form-group">
                <input type="text" placeholder="* School" value={school} onChange={e => onInputChange(e)} name="school" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="* Degree or certificate" value={degree} onChange={e => onInputChange(e)} name="degree" required />
                </div>
                <div className="form-group">
                <input type="text" placeholder="Field of Study" value={fieldofstudy}  onChange={e => onInputChange(e)} name="fieldofstudy" />
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
                    }} /> On Study </p>
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
                <input type="submit" className="btn btn-primary my-1" value='Add Education' />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(AddEducation));
