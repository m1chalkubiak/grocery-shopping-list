import styled from 'styled-components';

export default (theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 3,
  },
});

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

export const LoaderContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
