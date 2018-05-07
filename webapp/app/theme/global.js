import { injectGlobal } from 'styled-components';
import { createMuiTheme } from 'material-ui/styles';

// eslint-disable-next-line
injectGlobal`
  html, body {
    height: 100%;
    width: 100%;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  html.unsupported {
    .unsupported-page {
      display: block !important;
    }
  
    #app {
      display: none;
    }
  }
`;

export const theme = createMuiTheme();
