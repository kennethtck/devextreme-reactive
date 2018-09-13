import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  dayScale,
  monthCells,
  endViewBoundary,
  getMonthRectByDates,
  calculateMonthDateIntervals,
} from '@devexpress/dx-scheduler-core';
import { MonthView } from './month-view';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  dayScale: jest.fn(),
  monthCells: jest.fn(),
  endViewBoundary: jest.fn(),
  getMonthRectByDates: jest.fn(),
  calculateMonthDateIntervals: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    dateTableRef: {
      querySelectorAll: () => {},
    },
  },
  template: {
    body: {},
    navbar: {},
    sidebar: {},
    main: {},
  },
};

const defaultProps = {
  layoutComponent: () => null,
  dayPanelLayoutComponent: () => null,
  dayPanelCellComponent: () => null,
  dayPanelRowComponent: () => null,
  dateTableLayoutComponent: () => null,
  dateTableRowComponent: () => null,
  dateTableCellComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div>{children}</div>,
};

describe('Month View', () => {
  beforeEach(() => {
    endViewBoundary.mockImplementation(() => new Date('2018-08-06'));
    dayScale.mockImplementation(() => [1, 2, 3]);
    monthCells.mockImplementation(() => ([
      [{ value: new Date('2018-06-25') }, {}],
      [{}, { value: new Date('2018-08-05') }],
    ]));
    getMonthRectByDates.mockImplementation(() => [{
      x: 1, y: 2, width: 100, height: 150, dataItem: 'data',
    }]);
    calculateMonthDateIntervals.mockImplementation(() => []);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Getters', () => {
    it('should provide the "dayScale" getter', () => {
      const firstDayOfWeek = 2;
      const intervalCount = 2;
      const excludedDays = [1, 2];
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            intervalCount={intervalCount}
            excludedDays={excludedDays}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(dayScale)
        .toBeCalledWith('2018-07-04', firstDayOfWeek, 7, []);
      expect(getComputedState(tree).dayScale)
        .toEqual([1, 2, 3]);
    });

    it('should provide the "firstDayOfWeek" getter', () => {
      const firstDayOfWeek = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).firstDayOfWeek)
        .toBe(firstDayOfWeek);
    });

    it('should provide the "startViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(getComputedState(tree).startViewDate)
        .toEqual(new Date('2018-06-25'));
    });

    it('should provide the "endViewDate" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));
      expect(getComputedState(tree).endViewDate)
        .toEqual(new Date('2018-08-06'));
    });

    it('should provide the "firstDayOfWeek" getter', () => {
      const firstDayOfWeek = 2;
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            firstDayOfWeek={firstDayOfWeek}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).firstDayOfWeek)
        .toBe(firstDayOfWeek);
    });

    it('should provide the "intervalCount" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            intervalCount={2}
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).intervalCount)
        .toBe(2);
    });

    it('should provide the "currentView" getter', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).currentView)
        .toBe('month');
    });
  });

  describe('Templates', () => {
    it('should render view layout', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            layoutComponent={() => <div className="view-layout" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.view-layout').exists())
        .toBeTruthy();
    });

    it('should render day panel', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            dayPanelLayoutComponent={() => <div className="day-panel" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.day-panel').exists())
        .toBeTruthy();
    });

    it('should render date table', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            dateTableLayoutComponent={() => <div className="date-table" />}
          />
        </PluginHost>
      ));

      expect(tree.find('.date-table').exists())
        .toBeTruthy();
    });

    it('should render appointment container', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <MonthView
            {...defaultProps}
            // eslint-disable-next-line react/jsx-one-expression-per-line
            containerComponent={({ children }) => <div className="container">{children}</div>}
          />
        </PluginHost>
      ));

      expect(tree.find('.container').exists())
        .toBeTruthy();
    });
  });
});