import styled from 'styled-components';
import { theme } from '../../theme/global';

export default (theme) => ({
  button: {
    width: '100%',
    display: 'flex',
  },
  card: {
    flex: 1,
    margin: theme.spacing.unit,
    textAlign: 'left',
  },
  cardActions: {
    position: 'absolute',
    zIndex: 1,
    right: theme.spacing.unit,
    top: theme.spacing.unit,
  },
  cardContent: {
    paddingTop: theme.spacing.unit,
  },
  cardIconButton: {
    marginTop: 4,
    marginLeft: 0,
    marginRight: 0,
    width: 32,
    height: 32,
  },
  cardIcon: {
    width: '0.8em',
    height: '0.8em',
  },
});


export const Container = styled.div`
  flex: 1;
`;

export const CardContainer = styled.div`
  flex: 1;
  position: relative;
`;

export const ListItems = styled.div`
`;

export const ListItem = styled.span`
  text-decoration: ${(props) => props.disabled ? 'line-through' : 'none'};
  color: ${(props) => props.disabled ? theme.palette.grey[500] : theme.palette.text.primary};
`;

export const ProgressContainer = styled.div`
  margin-top: ${2 * theme.spacing.unit}px;
`;


