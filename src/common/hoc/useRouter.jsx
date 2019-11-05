import React from 'react';
import { withRouter } from 'react-router';

const useRouter = (component) => {
    let Comp = withRouter(component)
    return <Comp />
};

export default useRouter;
