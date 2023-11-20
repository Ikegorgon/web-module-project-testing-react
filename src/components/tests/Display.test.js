import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

import mockFetchShow from './../../api/fetchShow';
jest.mock('./../../api/fetchShow');

const testShow = {
    name: "test",
    summary: "This is a test",
    seasons: [
        {id:0, name: "Season 1", episodes: []},
        {id:1, name: "Season 2", episodes: []},
        {id:2, name: "Season 3", episodes: []}
      ]
}

test('renders without errors with no props', () => {
    render(<Display />);
});

test('renders Show component when the button is clicked ', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const show = await screen.findByTestId('show-container');
    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async () => {
    mockFetchShow.mockResolvedValueOnce(testShow);
    render(<Display />);
    const button = screen.getByRole('button');
    userEvent.click(button);

    const seasons = await screen.findAllByTestId('season-option');
    expect(seasons).toHaveLength(3);
});
