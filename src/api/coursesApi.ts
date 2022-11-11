import axios from "./axios"

export const reorderMemberships = (settings: {
    membershipType: string,
    membershipId: number,
    source: number,
    destination: number,
    order: number,
    userId: number,
}) => {
    axios.patch(`/api/v1/${settings.membershipType}/${settings.membershipId}`, { source: settings.source, destination: settings.destination, order: settings.order, user_id: settings.userId }).then((res) => res.data);
}

export const getCoursesForUser

const req1 = axios.get(`/api/v1/courses?user_id=${user.id}`);
    const req2 = axios.get(`/api/v1/clubs?user_id=${user.id}`);
    const req3 = axios.get(`/api/v1/interests?user_id=${user.id}`);