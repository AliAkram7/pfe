
import React from 'react'
import { Navigate } from 'react-router';
import { useStudentContext } from '../../contexts/studentContext';
import InvitationReceived from './invitationReceived';
import InvitationSended from './invitationSended';
import './invitePartner.css'
import InvitePartnerForm from './invitePartnerForm';

export function InvitePartner() {



    const { isInTeam } = useStudentContext();

    return (
        isInTeam == false ? (
            <>
                <div className="main-page-name">
                    <h1>Join Team</h1>
                </div>
                <div className='container-invit-binom' >
                    <div className='invit-section'>
                        <InvitePartnerForm />
                        <InvitationSended />
                    </div>
                    <InvitationReceived />
                </div>
            </>)
            : <Navigate to="/student/team-section" />
    )


}
export default InvitePartner
