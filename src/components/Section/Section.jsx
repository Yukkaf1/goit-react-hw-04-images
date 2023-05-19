import PropTypes from 'prop-types';
import { PageSection, HeadTitle, Title } from './Section.styled';

export const Section = ({ headTitle, title, children }) => (
  <PageSection>
    {headTitle && <HeadTitle>{headTitle}</HeadTitle>}
    {title && <Title>{title}</Title>}
    {children}
  </PageSection>
);

Section.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
