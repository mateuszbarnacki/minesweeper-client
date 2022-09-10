import Test from './Test';
import TestRenderer from 'react-test-renderer';

describe('<Text/>', () => {
    it('should render', () => {
        const test = TestRenderer.create(<Test/>);
        expect(test.toJSON()).toMatchSnapshot();
    });
});