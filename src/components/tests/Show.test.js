import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';

const testShow = {
    name: "test",
    summary: "This is a test",
    seasons: [
        {id:0, name: "Season 1", episodes: []},
        {id:1, name: "Season 2", episodes: []},
        {id:2, name: "Season 3", episodes: []}
      ]
}

test('renders without errors', () => {
    render(<Show show={testShow} selectedSeason={"none"} />);
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);
    const loading = screen.getByText("Fetching data...");
    expect(loading).toBeInTheDocument();
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason={"none"} />);
    const seasonOptions = screen.queryAllByTestId('season-option');
    expect(seasonOptions).toHaveLength(3);
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect = jest.fn();
    render(<Show show={testShow} selectedSeason={"none"} handleSelect={handleSelect}/>);
    const select = screen.getByLabelText(/Select A Season/i);
    fireEvent.select(select, ["1"]);
});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
    const { rerender } = render(<Show show={testShow} selectedSeason={"none"} />);
    let episodes = screen.queryByTestId('episodes-container');
    expect(episodes).not.toBeInTheDocument();
    
    rerender(<Show show={testShow} selectedSeason={1} />);
    episodes = screen.queryByTestId('episodes-container');
    expect(episodes).toBeInTheDocument();
});
