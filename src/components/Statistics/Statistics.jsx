import PropTypes from 'prop-types';
import { StatList, StatItem } from './Statistics.styled';

export const Statistics = ({
  good,
  neutral,
  bad,
  total,
  positivePercentage,
}) => (
  <StatList>
    <StatItem>Good: {good}</StatItem>
    <StatItem>Neutral: {neutral}</StatItem>
    <StatItem>Bad: {bad}</StatItem>
    <StatItem>Total: {total}</StatItem>
    <StatItem>Positive feedback: {positivePercentage}%</StatItem>
  </StatList>
);

Statistics.propTypes = {
  bad: PropTypes.number,
  good: PropTypes.number,
  neutral: PropTypes.number,
  positivePercentage: PropTypes.number,
  total: PropTypes.number,
};
