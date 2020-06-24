import React from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'

const ProfileEducation = ({ education }) => {
    return (
        <div>
            <h3>{education.school}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{education.from}</Moment> - { !education.to ? 'Now' : <Moment format='YYYY/MM/DD'>{education.to}</Moment> }
            </p>
            <p><strong>Degree: </strong>{education.degree}</p>
            <p><strong>Field Of Study: </strong>{education.fieldofstudy}</p>
            <p>
              <strong>Description: </strong>{education.description}
            </p>
        </div>
    )
}


ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
}

export default ProfileEducation
