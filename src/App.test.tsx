/** @jest-environment jsdom */


import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('renders learn react link', async () => {


    render(<App />);
    await screen.findByText(/ERRORLOADINGGAMES/i);
    //console.log(container.innerHTML);
  });
});



  // expect(linkElement).toBeInTheDocument();
//});
