import React from 'react'
import Moment from 'react-moment';
import PropTypes from 'prop-types'

const ProfileExp = ({ experience }) => {
    return (
        <div>
            <h3 class="text-dark">{experience.company}</h3>
            <p>
                <Moment format='YYYY/MM/DD'>{experience.from}</Moment> - { !experience.to ? 'Now' : <Moment format='YYYY/MM/DD'>{experience.to}</Moment> }
            </p>
            <p><strong>Position: </strong>{experience.title}</p>
            <p>
            <strong>Description: </strong>{experience.description}
            </p>
        </div>
    )
}

ProfileExp.propTypes = {
    experience: PropTypes.object.isRequired,
}

export default ProfileExp
