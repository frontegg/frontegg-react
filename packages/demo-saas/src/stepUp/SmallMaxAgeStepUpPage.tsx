import React from 'react';

import { wrapWithBaseHomePage } from '../BaseHomePage/BaseHomePage';
import { StepUpSimpleButtonScenario } from './components/StepUpSimpleButtonScenario';

const MAX_AGE = 35;

const Page = () => <StepUpSimpleButtonScenario maxAge={MAX_AGE} />;

export default wrapWithBaseHomePage(Page);
