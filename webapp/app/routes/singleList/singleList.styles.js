import styled from 'styled-components';
import { theme } from '../../theme/global';


export default (theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 3,
  },
  itemIconButton: {
    marginTop: 4,
    width: 32,
    height: 32,
  },
  itemIcon: {
    width: '0.8em',
    height: '0.8em',
  },
});

export const Container = styled.div`
  overflow: auto;
`;

export const LoaderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TitleContainer = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 8px;
`;

export const ListItemText = styled.div`
  padding-left: ${theme.spacing.unit * 2}px;
  text-decoration: ${(props) => props.disabled ? 'line-through' : 'none'};
  color: ${(props) => props.disabled ? theme.palette.grey[500] : theme.palette.text.primary};
`;


