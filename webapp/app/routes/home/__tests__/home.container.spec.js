import { expect } from 'chai';
import { spy } from 'sinon';

import { mapDispatchToProps } from '../home.container';
import { LocalesActions } from '../../../modules/locales/locales.redux';


describe('Home: Container', () => {
  describe('mapDispatchToProps', () => {
    it('should call LocalesActions.setLanguage', () => {
      const dispatch = spy();

      mapDispatchToProps(dispatch).setLanguage();

      expect(dispatch).to.have.been.calledWith(LocalesActions.setLanguage());
    });
  });
});
