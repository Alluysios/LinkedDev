import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profiles'

const Education = ({ education, deleteEducation }) => {
    let educations = []
    if(education) {
        educations = education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td className='hide-sm'>
                    {edu.degree}
                </td>
                <td className='hide-sm'>
                    {edu.fieldofstudy}
                </td>
                <td className='hide-sm'>
                    <Moment format='YYYY/MM/DD'>{edu.from}</Moment> - {
                        edu.to === null ? ('Now') : (<Moment format='YYYY/MM/DD'>{edu.to}</Moment>)
                    }
                </td>
                <td>
                    <button onClick={() => deleteEducation(edu._id)} className='btn btn-danger'>Delete</button>
                    <Link to='/' className='btn btn-primary'>Update</Link>
                </td>
            </tr>
        ));
    }

    return (
        <Fragment>
            <h2 className='my-2'>Education</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Field of Study</th>
                        <th className='hide-sm'>Year</th>
                    </tr>
                </thead>
                <tbody>
                    {educations}
                </tbody>
            </table>
        </Fragment>
    )
}

Education.propTypes = {
    education: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired
}

export default connect(null, {deleteEducation})(Education)
