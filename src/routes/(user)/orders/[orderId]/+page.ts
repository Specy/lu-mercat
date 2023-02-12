import { api } from '$stores/api/api';
import type { PageLoad } from './$types';
 
export const load = (async ({ params }) => {
    const order = await api.getOrder(params.orderId)
    return {
        props: {
            order
        }
    }
}) satisfies PageLoad;