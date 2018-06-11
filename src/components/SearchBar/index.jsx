import { Component } from 'react';
import { func, number } from 'prop-types';
import FilterLinesIcon from './FilterLinesIcon';
import { searchBar, searchInput } from './index.module.css';

export default class SearchBar extends Component {
  static propTypes = {
    /**
     * Executes a function when the user starts typing.
     */
    onSearch: func,
    /**
     * Executes a function when the search input has been cleared.
     */
    onClearSearch: func,
    /**
     * Executes a function when the option `Filter Lines With Matches`
     * is enable.
     */
    onFilterLinesWithMatches: func,
    /**
     * Number of search results. Should come from the component
     * executing the search algorithm.
     */
    resultsCount: number,
  };

  static defaultProps = {
    onSearch: null,
    onClearSearch: null,
    onFilterLinesWithMatches: null,
    resultsCount: 0,
  };

  state = {
    keywords: '',
    filterLines: false,
  };

  handleOnChange = e => {
    const { value: keywords } = e.target;
    const { onSearch, onClearSearch } = this.props;

    this.setState({ keywords });

    if (keywords && keywords.length > 2) {
      onSearch(keywords);
    } else {
      onClearSearch();
    }
  };

  handleFilterLinesWithMatches = () => {
    const { onFilterLinesWithMatches } = this.props;

    this.setState(
      {
        filterLines: !this.state.filterLines,
      },
      () => onFilterLinesWithMatches(this.state.filterLines)
    );
  };

  render() {
    const { resultsCount } = this.props;
    const matchesLabel = `match${resultsCount === 1 ? '' : 'es'}`;

    return (
      <div className={searchBar}>
        <input
          type="text"
          name="search"
          placeholder="Search"
          className={searchInput}
          onChange={this.handleOnChange}
          value={this.state.keywords}
        />
        <div onClick={this.handleFilterLinesWithMatches}>
          <FilterLinesIcon />
        </div>
        <span>
          {this.props.resultsCount} {matchesLabel}
        </span>
      </div>
    );
  }
}
