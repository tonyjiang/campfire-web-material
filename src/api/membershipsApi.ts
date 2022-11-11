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