import PropTypes from 'prop-types';
import { Button } from './feedbackChoice.styled';

export const FeedbackOptions = ({ options, onLeaveFeedback }) =>
  options.map(name => (
    <Button type="button" name={name} key={name} onClick={onLeaveFeedback}>
      {name}
    </Button>
  ));

FeedbackOptions.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
  onLeaveFeedback: PropTypes.func,
};
