import * as React from 'react';
import PropTypes from 'prop-types';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
function HideOnScroll(props) {
    var children = props.children;
    var trigger = useScrollTrigger();
    return (React.createElement(Slide, { appear: false, direction: "down", in: !trigger }, children));
}
HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
};
export default HideOnScroll;
