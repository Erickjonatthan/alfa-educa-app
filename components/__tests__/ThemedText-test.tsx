import * as React from 'react';
import renderer from 'react-test-renderer';

import { ThemedText } from '../ThemedText';

jest.mock('../../hooks/useColorScheme', () => ({
  __esModule: true,
  useColorScheme: () => 'light',
}));

import { act } from 'react-test-renderer';

it(`renders correctly`, () => {
  let tree;
  act(() => {
    tree = renderer.create(<ThemedText>Snapshot test!</ThemedText>);
  });

  expect(tree!.toJSON()).toMatchSnapshot();
});
