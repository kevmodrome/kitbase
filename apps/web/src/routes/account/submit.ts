import type { SubmitFunction } from '$app/forms';
import { applyAction } from '$app/forms';

export const update: SubmitFunction = ({ form }) => {
    return async function ({ result }) {
        form.dispatchEvent(new CustomEvent('loading'));
        await applyAction(result);
        form.dispatchEvent(new CustomEvent('finish'));
    };
};